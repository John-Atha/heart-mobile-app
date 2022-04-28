from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from api.models import *
from api.views_.helpers import OK

class Dummy(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        return OK("Hello, world!")