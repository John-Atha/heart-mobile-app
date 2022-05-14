# run script (from root directory) with ./manage.py shell < api/scripts/users.py
import os, django
import random
from api.models import *
from api.serializers.users import DoctorInfoSerializer, PatientInfoSerializer, UserSerializer

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

def get_random_patient_info():
    age = random.choice([i for i in range(30, 90)])
    height = random.choice([i/100 for i in range(160, 190, 1)])
    weight = random.choice([i for i in range(50, 100)])
    gender = random.choice([0, 1, 2])
    smoking = random.choice([True]*7+[False]*15)
    drinking = random.choice([True]*7+[False]*15)
    exercising = random.choice([True]*7+[False]*15)
    return {
        "age": age,
        "height": height,
        "weight": weight,
        "gender": gender,
        "smoking": smoking,
        "drinking": drinking,
        "exercising": exercising,
    }


def get_random_user():
    first_names = ["John", "George", "Thanos", "Andrew", "Antony", "Alex", "Spyros"]
    last_names = ["White", "Smith", "Blank", "Sterling", "Ronaldo"]
    first_name = random.choice(first_names)
    last_name = random.choice(last_names)
    email = first_name.lower()+str(round(random.random()*100))+"@gmail.com"
    is_doctor = random.choice([True]*3+[False]*10)
    return {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "username": email,
        "is_doctor": is_doctor,
    }


users = [get_random_user() for i in range(100)]


for user in users:
    new_user = UserSerializer(data=user)
    if new_user.is_valid():
        new_user = new_user.save()
        new_user.set_password("123456")
        if new_user.is_doctor:
            doctor_info = DoctorInfoSerializer(data={"expertise": "Cardiologist"})
            if doctor_info.is_valid():
                doctor_info = doctor_info.save()
                new_user.doctor_info = doctor_info
        else:
            patient_info = PatientInfoSerializer(data=get_random_patient_info())
            if patient_info.is_valid():
                patient_info = patient_info.save()
                new_user.patient_info = patient_info
        new_user.save()
    else:
        print("Invalid user:", new_user.data)
