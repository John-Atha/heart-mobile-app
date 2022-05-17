from rest_framework import serializers
from api.models import *

class BriefDoctorSerializer(serializers.ModelSerializer):
    doctor_info = serializers.SerializerMethodField()

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
        ]
    
    def get_doctor_info(self, doctor: User):
        return {
            "expertise": doctor.doctor_info.expertise,
            "description": doctor.doctor_info.description,
        }
