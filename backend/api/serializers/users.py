from rest_framework import serializers
from api.models import *
from api.views_.helpers import is_patient_in_danger_by_doctor, is_patient_in_danger_general
# from api.serializers.diseases import DiseaseSerializer

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
            'smoking',
            'drinking',
            'exercising',
        ]

class UserSerializer(serializers.ModelSerializer):
    doctor_info = DoctorInfoSerializer(many=False, read_only=True)
    patient_info = PatientInfoSerializer(many=False, read_only=True)
    danger = serializers.SerializerMethodField()

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
            'danger',
        ]
    
    def get_danger(self, user: User):
        if not self.context.get('compute_danger'):
            return {}

        request_user = self.context['request_user']
        if request_user.is_doctor:
            return is_patient_in_danger_by_doctor(
                patient=user,
                doctor=request_user
            )
        return is_patient_in_danger_general(
            patient=user,
        )
