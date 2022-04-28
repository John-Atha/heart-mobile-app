from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from api.models import *
from api.views.helpers import *

class Users(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        return OK([])