# Generated by Django 4.0.4 on 2022-04-29 09:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_doctorinfo_patientinfo_user_doctor_info_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patientinfo',
            name='gender',
            field=models.IntegerField(blank=True, choices=[(1, 'Female'), (0, 'Male')], null=True),
        ),
    ]
