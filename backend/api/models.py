from datetime import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class DoctorInfo(models.Model):
    description = models.TextField(max_length=2000, null=True, blank=True)
    expertise = models.CharField(max_length=500, null=True, blank=True)

class PatientInfo(models.Model):
    class Gender(models.IntegerChoices):
        MALE = 0
        FEMALE = 1
        OTHER = 2
    
    age = models.PositiveIntegerField(null=True, blank=True)
    height = models.FloatField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    gender = models.IntegerField(choices=Gender.choices, null=True, blank=True)  

class Disease(models.Model):
    name = models.TextField(max_length=200, null=False, blank=False, unique=True)
    description = models.TextField(max_length=2000, null=False, blank=False)

# email === username always (if user is created through the register endpoint...)
class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True, null=False, blank=False)
    first_name = models.CharField(max_length=150, null=False, blank=False)
    last_name = models.CharField(max_length=150, null=False, blank=False)
    email = models.EmailField(max_length=100, unique=True, null=False)
    is_doctor = models.BooleanField(default=False, null=False, blank=False)
    doctor_info = models.OneToOneField(DoctorInfo, on_delete=models.SET_NULL, null=True, blank=True, related_name="user")
    patient_info = models.OneToOneField(PatientInfo, on_delete=models.SET_NULL, null=True, blank=True, related_name="user")
    disease = models.ForeignKey(Disease, on_delete=models.SET_NULL, null=True, related_name="users")

    def __str__(self):
        return f"id:{self.id},email:{self.email}"

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="sent_messages")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="received_messages")
    text = models.TextField(max_length=2000, null=False, blank=False)
    seen = models.BooleanField(default=False, blank=False, null=False)
    datetime = models.DateTimeField(default=datetime.now, null=False, blank=False)

    class Meta:
        ordering = ['datetime']

class Metric(models.Model):
    name = models.TextField(max_length=200, null=False, blank=False)
    upper_limit = models.DecimalField(max_digits=5, decimal_places=2, null=False, blank=False)
    lower_limit = models.DecimalField(max_digits=5, decimal_places=2, null=False, blank=False)
    upper_warning = models.TextField(max_length=1000, null=False, blank=False)
    lower_warning = models.TextField(max_length=1000, null=False, blank=False)

class UserMetric(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name='user_metrics')
    metric = models.ForeignKey(Metric, on_delete=models.CASCADE,  null=False, blank=False, related_name='user_metrics')
    value = models.DecimalField(max_digits=5, decimal_places=2, null=False, blank=False)
    date = models.DateTimeField(null=False)
