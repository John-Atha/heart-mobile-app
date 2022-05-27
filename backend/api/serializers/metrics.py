from rest_framework import serializers
from api.models import *
from api.serializers.users import UserSerializer

class MetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metric
        fields = [
            'id',
            'name',
            'description',
        ]
