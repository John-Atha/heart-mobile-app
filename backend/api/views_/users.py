import json
from api.serializers.users import UserSerializer
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import *
from .helpers import OK, BadRequestException, Deleted, NotFoundException, SerializerErrors, UnAuthorizedException

class Logged(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return OK(UserSerializer(request.user).data)

class Users(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        users = User.objects.all()
        return OK(UserSerializer(users, many=True).data)
    
    def post(self, request):
        try:
            body = json.loads(request.body)
        except Exception:
            return BadRequestException("Invalid body structure")
        password, confirmation = body.get("password"), body.get("confirmation")
        if password==confirmation and password is not None:
            body['username'] = body.get('email')
            user = UserSerializer(data=body)
            if user.is_valid():
                user.save()
                id = user.data.get('id')
                new_user = User.objects.get(id=id)
                new_user.set_password(password)
                new_user.save()
                refresh = RefreshToken.for_user(new_user)
                res = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
                return OK(res)
            return SerializerErrors(user)
        return BadRequestException("Password and confirmation must be the same")

class OneUser(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return NotFoundException("User", id)
        return OK(UserSerializer(user).data)
    
    def handle_update(self, request, id, kind="update"):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return NotFoundException("User", id)
        if request.user!=user:
            return UnAuthorizedException()
        if kind=="delete":
            user.delete()
            return Deleted()
        try:
            body = json.loads(request.body)
        except Exception:
            return BadRequestException("Invalid body structure")
        body['username'] = body.get('email') or user.username
        user = UserSerializer(user, data=body, partial=True)
        if user.is_valid():
            user.save()
            return OK(user.data)
        return SerializerErrors(user)

    def put(self, request, id):
        return self.handle_update(request, id)
    
    def delete(self, request, id):
        return self.handle_update(request, id, "delete")
