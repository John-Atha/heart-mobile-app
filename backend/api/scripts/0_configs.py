# run script (from root directory) with ./manage.py shell < api/scripts/configs.py
import os, django
from api.models import *

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

configs = [
    {
        "name": "submissions_interval",
        "type": 1,
        "value": 1,
    },
]

for config in configs:
    name = config.get("name")
    type = config.get("type")
    value = config.get("value")
    try:
        existing = Config.objects.get(name=name)
        print(f"Config '{name}' already exists")
    except Config.DoesNotExist:
        new_config = Config(
            name=name,
            type=type,
            value=value,
        )
        new_config.save()