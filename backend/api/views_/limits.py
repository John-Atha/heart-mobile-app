import json
from api.serializers.users import UserSerializer
from rest_framework.views import APIView
from rest_framework import permissions
from api.models import Limit, LimitsGroup, Metric, User
from api.serializers.limits import LimitSerializer, LimitsGroupSerializer
from api.serializers.metrics import MetricSerializer
from api.views_.helpers import OK, BadRequestException, Deleted, IsDoctor, NotFoundException, SavedSuccessfully, SerializerErrors, UnAuthorizedException

class OneUserLimitsGroup(APIView):
    permission_classes = [IsDoctor]
    
    def change(self, request, id, kind="delete"):
        try:
            group = LimitsGroup.objects.get(id=id)
        except LimitsGroup.DoesNotExist:
            return NotFoundException("Limits group", id)
        if group.doctor != request.user:
            return UnAuthorizedException()
        
        if kind=='delete':
            group.delete()
            return Deleted()
        
        existing_limits = [
            {
                "metric": limit.metric,
                "upper_limit": limit.upper_limit,
                "lower_limit": limit.lower_limit,
            }
            for limit in group.limits.all()
        ]

        def rollback():
            group.limits.all().delete()
            for lim in existing_limits:
                metric = lim['metric']
                upper_limit = lim['upper_limit']
                lower_limit = lim['lower_limit']
                lim = Limit(
                    metric=metric,
                    upper_limit=upper_limit,
                    lower_limit=lower_limit,
                    group=group,
                )
                lim.save()

        group.limits.all().delete()
        try:
            body = json.loads(request.body)
            for limit_data in body.get("limits"):
                metric_name = limit_data.get("metric")
                if metric_name:
                    try:
                        metric = Metric.objects.get(name=metric_name)
                    except Metric.DoesNotExist:
                        rollback()
                        return NotFoundException("Metric", metric_name)
                    limit = Limit(group=group, metric=metric)
                    limit = LimitSerializer(limit, data=limit_data)
                    if limit.is_valid():
                        limit.save()
                    else:
                        rollback()
                        return SerializerErrors(limit)
                else:
                    rollback()
                    return BadRequestException("Metric's name not provided")
        except Exception as e:
            print(e)
            rollback()
            return BadRequestException("Invalid body")
        group.receive_notification = bool(body.get("receive_notification"))
        group.save()
        return SavedSuccessfully()

    def put(self, request, id):
        return self.change(request, id, "update")

    def delete(self, request, id):
        return self.change(request, id, "delete")

class UserLimitsGroups(APIView):
    permission_classes = [IsDoctor]

    def get(self, request, id):
        # todo: add auth
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return NotFoundException("User", id)
        try:
            group = user.patient_limits_groups.get(doctor=request.user)
            return OK(LimitsGroupSerializer(group, many=False).data)
        except LimitsGroup.DoesNotExist:
            # metrics = Metric.objects.all()
            # return OK({
            #     "patient": UserSerializer(user).data,
            #     "doctor": UserSerializer(request.user).data,
            #     "limits": [
            #         {
            #             'metric': MetricSerializer(metric).data,
            #             'lower_limit': "",
            #             'upper_limit': "",
            #         }
            #         for metric in metrics
            #     ]
            # })
            return NotFoundException(f"Limits group for patient '{user.id}' and doctor", request.user.id)

    def post(self, request, id):
        try:
            patient = User.objects.get(id=id)
        except User.DoesNotExist:
            return NotFoundException("User", id)
        try:
            body = json.loads(request.body)
            LimitsGroup.objects.get(patient=patient, doctor=request.user)
            return BadRequestException("This doctor has already assigned limits to this user")
        except LimitsGroup.DoesNotExist:
            pass
        group = LimitsGroup(patient=patient, doctor=request.user)
        group.receive_notification = bool(body.get("receive_notification"))
        group.save()
        try:
            if not len(body):
                return BadRequestException("Specify at least one metric's limits")
            for limit_data in body.get("limits"):
                metric_name = limit_data.get("metric")
                if metric_name:
                    try:
                        metric = Metric.objects.get(name=metric_name)
                    except Metric.DoesNotExist:
                        return NotFoundException("Metric", metric_name)
                    limit = Limit(group=group, metric=metric)
                    limit = LimitSerializer(limit, data=limit_data)
                    if limit.is_valid():
                        limit.save()
                    else:
                        group.delete()
                        return SerializerErrors(limit)
                else:
                    group.delete()
                    return BadRequestException("Metric's name not provided")
        except Exception as e:
            print(e)
            group.delete()
            return BadRequestException("Invalid body structure")
        
        return SavedSuccessfully()