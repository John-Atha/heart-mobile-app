from collections import defaultdict
from datetime import tzinfo
import json
from time import tzname
from typing import List
from api.serializers.users import DoctorInfoSerializer, PatientInfoSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import *
from api.serializers.usermetrics import UserMetricSerializer, UserMetricsGroupSerializer
from .helpers import OK, BadRequestException, Deleted, NotFoundException, SavedSuccessfully, SerializerErrors, UnAuthorizedException

class Logged(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return OK(UserSerializer(request.user).data)

class Users(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        kind = request.GET.get("kind")
        if kind=="doctors":
            users = User.objects.filter(is_doctor=True)
        else:
            users = User.objects.all()
        return OK(UserSerializer(users, many=True).data)
    
    def post(self, request):
        try:
            body = json.loads(request.body)
        except Exception:
            return BadRequestException("Invalid body structure")
        password, confirmation = body.get("password"), body.get("confirmation")
        if password==confirmation and password is not None:
            body['username'] = body.get('email')
            user = UserSerializer(data=body)
            if user.is_valid():
                user.save()
                id = user.data.get('id')
                new_user = User.objects.get(id=id)
                new_user.set_password(password)
                new_user.save()
                refresh = RefreshToken.for_user(new_user)
                res = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
                return OK(res)
            return SerializerErrors(user)
        return BadRequestException("Password and confirmation must be the same")

class OneUser(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return NotFoundException("User", id)
        return OK(UserSerializer(user).data)
    
    def handle_update(self, request, id, kind="update"):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return NotFoundException("User", id)
        if request.user!=user:
            return UnAuthorizedException()
        if kind=="delete":
            user.delete()
            return Deleted()
        try:
            body = json.loads(request.body)
        except Exception:
            return BadRequestException("Invalid body structure")

        # username will always be the same with the email
        body['username'] = body.get('email') or user.username
        # cannot change
        body['is_doctor'] = user.is_doctor
        
        # build (create or merge) the user info serializer
        if user.is_doctor:
            info_data = body.get("doctor_info")
            if info_data:
                if user.doctor_info:
                    info = DoctorInfoSerializer(user.doctor_info, data=info_data, partial=True)
                else:
                    info = DoctorInfoSerializer(data=info_data, partial=True)
        else:
            info_data = body.get("patient_info")
            if info_data:
                if user.patient_info:
                    print("merging")
                    info = PatientInfoSerializer(user.patient_info, data=info_data, partial=True)
                else:
                    print("creating")
                    info = PatientInfoSerializer(data=info_data, partial=True)
        if info_data and not info.is_valid():
            return SerializerErrors(info)
            
        user = UserSerializer(user, data=body, partial=True)
        if user.is_valid():
            new_user = user.save()
            if info_data:
                new_info = info.save()
                # attach the info object to the user
                if new_user.is_doctor:
                    new_user.doctor_info = new_info
                else:
                    new_user.patient_info = new_info
                new_user.save()
            
            return OK(UserSerializer(new_user).data)
        return SerializerErrors(user)

    def put(self, request, id):
        return self.handle_update(request, id)
    
    def delete(self, request, id):
        return self.handle_update(request, id, "delete")


def is_form_open(user: User):
    group = user.metrics_groups.last()
    try:
        days = Config.objects.get(name='submissions_interval')
    except Config.DoesNotExist:
        return True
    date_diff = (datetime.now()-group.datetime.replace(tzinfo=None)).days
    if date_diff<int(days.value):
        return False
    return True

class OneUserMetrics(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return NotFoundException("User", id)
        # todo: add permissions (either the patient or one of his/her doctors)
        
        last_group = request.GET.get("last")
        if last_group:
            group = user.metrics_groups.last()
            data = UserMetricsGroupSerializer(group).data
            data["open"] = is_form_open(user)
            return OK(data)
        groups = user.metrics_groups.order_by('-datetime')
        return OK(UserMetricsGroupSerializer(groups, many=True).data)
    
    def post(self, request, id):
        # authorize
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return NotFoundException("User", id)
        if request.user!=user:
            print(user)
            print(request.user)
            return UnAuthorizedException()

        # validate previous form submission date        
        if not is_form_open(user):                
            return BadRequestException(f"You have to wait to post another form")
        # build group and save
        body = json.loads(request.body)
        try:
            group = UserMetricsGroup(user=user)
            group.save()
            for user_metric_data in body:
                metric_name = user_metric_data.get('metric')
                try:
                    metric = Metric.objects.get(name=metric_name)
                except Metric.DoesNotExist:
                    group.delete()
                    return NotFoundException("Metric", metric_name)
                user_metric = UserMetric(metric=metric, group=group)
                user_metric = UserMetricSerializer(user_metric, data=user_metric_data)
                if user_metric.is_valid():
                    user_metric = user_metric.save()
                    return SavedSuccessfully()
                else:
                    return SerializerErrors(user_metric)
        except Exception:
            return BadRequestException("Invalid body")