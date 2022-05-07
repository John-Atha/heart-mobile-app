from django.contrib import admin

from api.models import DoctorInfo, Message, PatientInfo, User, Disease, Metric, UserMetric

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'username',
        'first_name',
        'last_name',
        'email',
        'is_doctor'
    )

class MessageAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'sender',
        'receiver',
        'text',
        'seen',
        'datetime',
    )

class PatientInfoAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'age',
        'height',
        'weight',
        'gender',
        'user',
    )

class DoctorInfoAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'description',
        'expertise',
        'user',
    )

class MetricAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'upper_limit',
        'lower_limit',
        'upper_warning',
        'lower_warning'
    )

class DiseaseAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'description'
    )

class UserMetricAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'metric',
        'value',
        'date'
    )

admin.site.register(User, UserAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(DoctorInfo, DoctorInfoAdmin)
admin.site.register(PatientInfo, PatientInfoAdmin)
admin.site.register(Disease, DiseaseAdmin)
admin.site.register(Metric, MetricAdmin)
admin.site.register(UserMetric, UserMetricAdmin)