from rest_framework import serializers
from api.models import *

class DiseaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disease
        fields = [
            'id',
            'name',
            'description',
        ]
