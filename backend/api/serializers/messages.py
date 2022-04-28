from api.serializers.users import UserSerializer
from rest_framework import serializers
from api.models import *

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(many=False, read_only=True)
    receiver = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Message
        fields = [
            'id',
            'sender',
            'receiver',
            'text',
            'seen',
            'datetime',
        ]