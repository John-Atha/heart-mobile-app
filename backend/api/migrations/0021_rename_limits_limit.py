# Generated by Django 4.0.4 on 2022-05-15 17:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_limits_remove_user_metrics_user_limits_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Limits',
            new_name='Limit',
        ),
    ]
