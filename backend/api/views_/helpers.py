from rest_framework.response import Response
from rest_framework import status

def OK(resp):
    return Response(resp, status.HTTP_200_OK)
