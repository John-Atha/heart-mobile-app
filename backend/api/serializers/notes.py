from rest_framework import serializers
from api.models import *
from api.serializers.users import UserSerializer

class NoteSerializer(serializers.ModelSerializer):
    doctor = UserSerializer(many=False, read_only=True)
    patient = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Note
        fields = [
            'id',
            'doctor',
            'patient',
            'text',
            'datetime',
        ]