from collections import defaultdict
from datetime import datetime
from email.policy import default
import json
from multiprocessing import context
from statistics import mean
from unittest import result
from rest_framework.views import APIView
from rest_framework import permissions
from api.models import Config, Metric, PatientInfo, User, UserMetric, UserMetricsGroup
from api.serializers.metrics import MetricSerializer
from api.views_.helpers import OK, BadRequestException, NotFoundException, SavedSuccessfully, SerializerErrors, UnAuthorizedException
from api.serializers.usermetrics import UserMetricSerializer, UserMetricsGroupSerializer

class Metrics(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        metrics = Metric.objects.all()
        return OK(MetricSerializer(metrics, many=True).data)
    
def is_form_open(user: User):
    group = user.metrics_groups.last()
    if not group:
        return True
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
            data = UserMetricsGroupSerializer(
                group,
                context={'request_user': request.user}
            ).data
            data["open"] = is_form_open(user)
            return OK(data)
        groups = user.metrics_groups.order_by('-datetime')
        return OK(
            UserMetricsGroupSerializer(
                groups,
                many=True,
                context={'request_user': request.user}
            ).data
        )
    
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
                else:
                    return SerializerErrors(user_metric)
        except Exception:
            return BadRequestException("Invalid body")
        return SavedSuccessfully()

class OneUserMetricsStats(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return NotFoundException("User", id)
        # todo: fix auth 
        # if request.user!=user:
        #     return UnAuthorizedException()
        
        groups = user.metrics_groups \
            .order_by('datetime') \
        
        metrics = defaultdict(lambda: defaultdict(list))
        averages = defaultdict(lambda: defaultdict(int))

        for group in groups:
            date = group.datetime.date()
            key = f"{date.month}/{date.year}"
            for user_metric in group.metrics.all():
                name = user_metric.metric.name
                metrics[key][name].append(user_metric.value)
        
        for date in metrics:
            for metric in metrics[date]:
                averages[date][metric] = mean(metrics[date][metric])
        return OK(averages)

class OneUserAverageMetrics(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        if (request.user.is_doctor):
            return BadRequestException("Available only for simple patients")
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return UnAuthorizedException()
        if request.user!=user:
            return UnAuthorizedException()
        
        metrics_groups = user.metrics_groups.all()
        print(metrics_groups)
        
        metrics = Metric.objects.all()
        
        records = defaultdict(list)

        for group in metrics_groups:
            metrics = group.metrics.all()
            if metrics:
                for metric_record in metrics:
                    metric, value = metric_record.metric, metric_record.value
                    name = metric.name
                    records[name].append(float(value))
        
        results = { key: round(mean(values), 3) for [key, values] in records.items() }
        info: PatientInfo = user.patient_info
        if info:
            results['age'] = info.age
            results['gender'] = info.gender
            results['height'] = info.height
            results['weight'] = info.weight
            results['smoking'] = info.smoking
            results['exercising'] = info.exercising
            results['drinking'] = info.drinking
            
        return OK(results)