from rest_framework import serializers
from api.models import *
from api.serializers.diseases import DiseaseSerializer

class DoctorInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorInfo
        fields = [
            'description',
            'expertise',
        ]

class PatientInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientInfo
        fields = [
            'age',
            'height',
            'weight',
            'gender',
        ]

class UserSerializer(serializers.ModelSerializer):
    doctor_info = DoctorInfoSerializer(many=False, read_only=True)
    patient_info = PatientInfoSerializer(many=False, read_only=True)
    disease = DiseaseSerializer(many=False, read_only=True)
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'is_doctor',
            'doctor_info',
            'patient_info',
            'disease'
        ]
