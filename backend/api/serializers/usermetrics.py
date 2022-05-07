from rest_framework import serializers
from api.models import *
from api.serializers.metrics import MetricSerializer
from api.serializers.users import UserSerializer

class UserMetricSerializer(serializers.ModelSerializer):
    class Meta:
        user = UserSerializer(many=False, read_only=True)
        metric = MetricSerializer(many=False, read_only=True)
        model = UserMetric
        fields = [
            'id',
            'user',
            'metric',
            'value',
            'date',
        ]