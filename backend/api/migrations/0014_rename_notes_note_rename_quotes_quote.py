# Generated by Django 4.0.4 on 2022-05-14 14:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_patientinfo_drinking_patientinfo_exercising_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Notes',
            new_name='Note',
        ),
        migrations.RenameModel(
            old_name='Quotes',
            new_name='Quote',
        ),
    ]