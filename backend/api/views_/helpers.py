from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

def OK(resp):
    return Response(resp, status.HTTP_200_OK)

def NotFoundException(name, id):
    return Response(f"{name} '{id}' does not exist", status.HTTP_404_NOT_FOUND)

def BadRequestException(msg):
    return Response(msg, status.HTTP_400_BAD_REQUEST)

def UnAuthorizedException():
    return Response("Unauthorized", status.HTTP_401_UNAUTHORIZED)

def SerializerErrors(serializer):
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

def Deleted():
    return OK("Deleted successfully")

def SavedSuccessfully():
    return OK("Saved successfully")

class IsDoctor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_doctor

class IsPatient(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and not request.user.is_doctor
