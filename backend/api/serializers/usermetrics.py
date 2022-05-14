from rest_framework import serializers
from api.models import *
from api.serializers.metrics import MetricSerializer
from api.serializers.users import UserSerializer

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
    class Meta:
        model = UserMetricsGroup
        fields = [
            'id',
            'user',
            'datetime',
            'metrics',
        ]
