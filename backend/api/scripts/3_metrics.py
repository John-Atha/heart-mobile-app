# run script (from root directory) with ./manage.py shell < api/scripts/metrics.py

import os, django
from api.models import *
from api.serializers.metrics import MetricSerializer

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

data = [
    {
        "name": "Cholesterol",
        "description": "Cholesterol placeholder description",
    },
    {
        "name": "Systolic blood pressure",
        "description": "Systolic blood pressure placeholder description",
    },
    {
        "name": "Diastolic blood pressure",
        "description": "Diastolic blood pressure placeholder description",
    },
    {
        "name": "Glucose",
        "description": "Glucose placeholder description",
    },
]


for datum in data:
    name = datum.get("name")
    description = datum.get("description")
    print(f"Saving metric {name}:", end=" ")
    try:
        existing_metric = Metric.objects.get(name=name)
        print("already exists")
    except Metric.DoesNotExist:
        new_metric = MetricSerializer(data=datum)
        if new_metric.is_valid():
            new_metric.save()
            print("saved successfully")
        else:
            print("could not be saved")
