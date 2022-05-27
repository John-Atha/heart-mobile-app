# run script (from root directory) with ./manage.py shell < api/scripts/quotes.py
import os, django
from api.models import *

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()


quotes = [
    "9/10 smokers suffer from cardiovasular diseases",
    "9/10 people who consume more than 1L of alcohol per week suffer from cardiovascular diseases",
    "Sleeping more than 7 hours per day decreases the risk of heart problems by 20%",
    "Exercising 2-3 times a week leads to a healthier heart"
]

for quote in quotes:
    new_quote = Quote(text=quote)
    new_quote.save()