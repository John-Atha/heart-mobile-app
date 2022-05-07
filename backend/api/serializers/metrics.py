from rest_framework import serializers
from api.models import *

class MetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metric
        fields = [
            'id',
            'name',
            'upper_limit',
            'lower_limit',
            'upper_warning',
            'lower_warning',
        ]
