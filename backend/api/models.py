from datetime import datetime
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

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="sent_messages")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="received_messages")
    text = models.TextField(max_length=2000, null=False, blank=False)
    seen = models.BooleanField(default=False, blank=False, null=False)
    datetime = models.DateTimeField(default=datetime.now, null=False, blank=False)

    class Meta:
        ordering = ['-datetime']