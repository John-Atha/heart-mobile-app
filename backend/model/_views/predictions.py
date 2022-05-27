from django.shortcuts import render
from rest_framework.views import APIView
from .helpers import OK, BadRequestException, Deleted, NotFoundException, SerializerErrors, UnAuthorizedException
import json

class Prediction(APIView):
    def post(self, request):
        user = request.user
        try:
            body = json.loads(request.body)
        except Exception:
            return BadRequestException("Invalid body structure")
