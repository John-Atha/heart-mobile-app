# Generated by Django 4.0.4 on 2022-05-14 12:28

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_config_notes_quotes_tag_userdoctorlimits_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='metrics',
            field=models.ManyToManyField(through='api.UserDoctorLimits', to=settings.AUTH_USER_MODEL),
        ),
    ]
