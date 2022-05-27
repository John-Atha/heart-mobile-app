from rest_framework import serializers
from api.models import *
from api.serializers.users import UserSerializer
from api.serializers.metrics import MetricSerializer

class LimitSerializer(serializers.ModelSerializer):
    metric = MetricSerializer(many=False, read_only=True)
    class Meta:
        model = Limit
        fields = [
            'id',
            'metric',
            'upper_limit',
            'lower_limit',
        ]

class LimitsGroupSerializer(serializers.ModelSerializer):
    patient = UserSerializer(many=False, read_only=True)
    doctor = UserSerializer(many=False, read_only=True)
    limits = LimitSerializer(many=True, read_only=True)
    class Meta:
        model = LimitsGroup
        fields = [
            'id',
            'patient',
            'doctor',
            'limits',
            'date',
            'receive_notification',
        ]


