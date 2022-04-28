from django.contrib import admin

from api.models import Message, User

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


admin.site.register(User, UserAdmin)
admin.site.register(Message, MessageAdmin)