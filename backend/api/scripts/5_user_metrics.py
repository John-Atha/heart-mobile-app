# run script (from root directory) with ./manage.py shell < api/scripts/5_user_metrics.py
import os, django
import random
from api.models import *

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

usual_limits = {
    "Cholesterol": (150, 300),
    "Systolic blood pressure": (100, 200),
    "Diastolic blood pressure": (50, 140),
    "Glucose": (50, 100),
}

start_time = datetime(2022, 1, 1, 10, 0, 0)
end_time = datetime(2022, 5, 1, 10, 0, 0)


def generate_user_metric(metric, group):
    lower, upper = usual_limits.get(metric.name)
    value = random.randrange(lower, upper)
    user_metric = UserMetric(
        metric=metric,
        value=value,
        group=group,
    )
    user_metric.save()

patients = User.objects.filter(is_doctor=False)
metrics = Metric.objects.all()

for patient in patients:
    if random.random()>0.2:
        datetime_ = start_time+(end_time-start_time)*random.random()
        group = UserMetricsGroup(user=patient, datetime=datetime_)
        group.save()
        for metric in metrics:
            if random.random()>0.2:
                generate_user_metric(metric, group)
        if not group.metrics.count():
            group.delete()