# run script (from root directory) with ./manage.py shell < api/scripts/messages.py
from cgitb import text
import os, django
import random

from django.dispatch import receiver
from api.models import *

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

texts = [
    "Hello",
    "Hi",
    "Good evening",
    "How are you?",
    "I have a question",
    "Good morning",
    "Good afternoon",
    "Everything OK?",
]

patients = User.objects.filter(is_doctor=False, is_superuser=False)
doctors = User.objects.filter(is_doctor=True, is_superuser=False)

def generate_msg(sender, receiver):
    msg1 = Message(
        sender=sender,
        receiver=receiver,
        text=random.choice(texts),
        seen=False,
    )
    msg1.save()

def generate_chat(user1, user2):
    generate_msg(user1, user2)
    for _ in range(10):
        if random.random()>0.7:
            break
        sender = random.choice([user1, user2])
        receiver = user1 if sender==user2 else user2
        generate_msg(sender, receiver)

for patient in patients:
    # 70% of patients have sent messages to 1-3 doctors
    if random.random()>0.3:
       doctors = random.sample(list(doctors), 3)
       for doctor in doctors:
           if random.random()>0.2:
            generate_chat(patient, doctor)
