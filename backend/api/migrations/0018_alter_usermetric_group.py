# Generated by Django 4.0.4 on 2022-05-14 16:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_remove_usermetric_datetime_remove_usermetric_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermetric',
            name='group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='metrics', to='api.usermetricsgroup'),
        ),
    ]
