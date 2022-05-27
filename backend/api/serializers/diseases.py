from rest_framework import serializers
from api.models import *

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = [
            'id',
            'name',
            'doctor',
            'patient',
            'is_disease',
        ]
