from rest_framework import serializers
from api.models import *
from api.serializers.metrics import MetricSerializer
from api.serializers.users import UserSerializer
from api.views_.helpers import format_metrics_group_danger, is_metric_group_in_danger

            
class UserMetricSerializer(serializers.ModelSerializer):
    metric = MetricSerializer(many=False, read_only=True)
    class Meta:
        metric = MetricSerializer(many=False, read_only=True)
        model = UserMetric
        fields = [
            'id',
            'metric',
            'value',
        ]

class UserMetricsGroupSerializer(serializers.ModelSerializer):
    metrics = UserMetricSerializer(many=True, read_only=True)
    user = UserSerializer(many=False, read_only=True)
    danger = serializers.SerializerMethodField()
    class Meta:
        model = UserMetricsGroup
        fields = [
            'id',
            'user',
            'datetime',
            'metrics',
            'danger',
        ]
      
    def get_danger(self, group: UserMetricsGroup):
        request_user = self.context.get("request_user")
        return format_metrics_group_danger(request_user, group)
