# Generated by Django 4.0.4 on 2022-04-28 17:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_message'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ['-datetime']},
        ),
    ]
