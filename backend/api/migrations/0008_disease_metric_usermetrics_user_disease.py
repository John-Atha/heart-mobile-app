# Generated by Django 4.0.4 on 2022-05-07 13:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_doctorinfo_expertise_alter_patientinfo_gender'),
    ]

    operations = [
        migrations.CreateModel(
            name='Disease',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=200, unique=True)),
                ('description', models.TextField(max_length=2000)),
            ],
        ),
        migrations.CreateModel(
            name='Metric',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=200)),
                ('upper_limit', models.DecimalField(decimal_places=2, max_digits=5)),
                ('lower_limit', models.DecimalField(decimal_places=2, max_digits=5)),
                ('upper_warning', models.TextField(max_length=1000)),
                ('lower_warning', models.TextField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='UserMetrics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.DecimalField(decimal_places=2, max_digits=5)),
                ('date', models.DateField()),
                ('metric', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_metrics', to='api.metric')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_metrics', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='disease',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='users', to='api.disease'),
        ),
    ]