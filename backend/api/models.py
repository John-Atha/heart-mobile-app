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
    smoking = models.BooleanField(default=False, null=False, blank=False)
    drinking = models.BooleanField(default=False, blank=False)
    exercising = models.BooleanField(default=False, blank=False)

# email === username always (if user is created through the register endpoint...)
class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True, null=False, blank=False)
    first_name = models.CharField(max_length=150, null=False, blank=False)
    last_name = models.CharField(max_length=150, null=False, blank=False)
    email = models.EmailField(max_length=100, unique=True, null=False)
    is_doctor = models.BooleanField(default=False, null=False, blank=False)
    doctor_info = models.OneToOneField(DoctorInfo, on_delete=models.SET_NULL, null=True, blank=True, related_name="user")
    patient_info = models.OneToOneField(PatientInfo, on_delete=models.SET_NULL, null=True, blank=True, related_name="user")
    metrics = models.ManyToManyField('self', through='UserDoctorLimits')
    
    def __str__(self):
        return f"id:{self.id},email:{self.email}"

# each doctor can add a tag to each patient
class Tag(models.Model):
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name='doctor_tags')
    patient = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name='patient_tags')
    name = models.TextField(max_length=200, null=False, blank=False, unique=True)
    is_disease = models.BooleanField(default=True, null=False, blank=False)

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
    description = models.TextField(max_length=200, null=True, blank=True)


class UserMetricsGroup(models.Model):
    datetime = models.DateTimeField(default=datetime.now, null=False, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name='metrics_groups')

# each user can pass his metrics on a certain date 
class UserMetric(models.Model):
    metric = models.ForeignKey(Metric, on_delete=models.CASCADE,  null=False, blank=False, related_name='user_metric')
    value = models.DecimalField(max_digits=5, decimal_places=2, null=False, blank=False)
    group = models.ForeignKey(UserMetricsGroup, on_delete=models.CASCADE, null=True, blank=True, related_name='metrics')


# each doctor can assign two limits for a certain user and metric
class UserDoctorLimits(models.Model):
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name='doctor_limits')
    patient = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name='patient_limits')
    metric = models.ForeignKey(Metric, on_delete=models.CASCADE,  null=False, blank=False, related_name='metric_limits')
    value = models.FloatField(null=False, blank=False)
    date = models.DateTimeField(default=datetime.today, null=False, blank=False)
    upper_limit = models.FloatField(null=False, blank=False)
    lower_limit = models.FloatField(null=False, blank=False)

'''
some global variables that will be kept like
* date interval between two consecutive userMetrics submissions
* ...
'''
class Config(models.Model):
    class Type(models.IntegerChoices):
        NUMBER = 1
        STRING = 2
    name = models.TextField(max_length=200, null=False, blank=False)
    value = models.TextField(null=False, blank=False)
    type = models.IntegerField(choices=Type.choices, null=True, blank=True)

class Quote(models.Model):
    text = models.TextField(max_length=100, null=False, blank=False)

# each doctor can post multiple notes to a patient's profile
class Note(models.Model):
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name='doctor_notes')
    patient = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name='patient_notes')
    text = models.TextField(max_length=500, null=False, blank=False)
    datetime = models.DateTimeField(default=datetime.now, null=False, blank=False)
