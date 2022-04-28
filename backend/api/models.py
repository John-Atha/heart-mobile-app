from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True, null=False, blank=False)
    first_name = models.CharField(max_length=150, null=False, blank=False)
    last_name = models.CharField(max_length=150, null=False, blank=False)
    email = models.EmailField(max_length=100, unique=True, null=False)
    is_doctor = models.BooleanField(default=False, null=False, blank=False)

    def __str__(self):
        return f"id:{self.id},email:{self.username}"
