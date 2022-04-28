import json
from django.db.models import Q
from api.serializers.messages import MessageSerializer
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import *
from .helpers import OK, BadRequestException, Deleted, NotFoundException, SerializerErrors, UnAuthorizedException

class MessagesSummary(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        msgs = Message.objects.filter(Q(sender=user)|Q(receiver=user)).order_by('-datetime')
        seen_contacts = set()
        messages = []
        for msg in msgs:
            sender, receiver = msg.sender, msg.receiver
            if sender==user and receiver.id in seen_contacts:
                continue
            if receiver==user and sender.id in seen_contacts:
                continue
            messages.append(msg)
            seen_contacts.add(receiver.id if sender==user else sender.id)
            print(seen_contacts)
        return OK(MessageSerializer(messages, many=True).data)


class Messages(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        contact_id = request.GET.get("contact")
        if contact_id:
            try:
                contact = User.objects.get(id=contact_id)
            except User.DoesNotExist:
                return NotFoundException("User", contact_id)
            messages = Message.objects.filter(
                sender__in=[user, contact],
                receiver__in=[user, contact],
            )
            return OK(MessageSerializer(messages, many=True).data)
        return BadRequestException("Specify contact")
    
    def post(self, request):
        sender = request.user
        try:
            body = json.loads(request.body)
        except Exception:
            return BadRequestException("Invalid body structure")
        receiver_id = body.get("receiver")
        try:
            receiver = User.objects.get(id=receiver_id)
        except Exception:
            return NotFoundException("User", receiver_id)
        msg = Message(receiver=receiver, sender=sender)
        msg = MessageSerializer(msg, data=body)
        if msg.is_valid():
            msg.save()
            return OK(msg.data)
        return SerializerErrors(msg)

class MessagesSeen(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        request.user.received_messages.filter(seen=False).update(seen=True)
        return OK("Marked as seen")
