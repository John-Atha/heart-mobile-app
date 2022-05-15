# Generated by Django 4.0.4 on 2022-05-15 11:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_alter_usermetric_group'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='doctor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_notes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='note',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_notes', to=settings.AUTH_USER_MODEL),
        ),
    ]
