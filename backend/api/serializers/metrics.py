from rest_framework import serializers
from api.models import *

class MetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metric
        fields = [
            'id',
            'name',
            'description',
        ]
