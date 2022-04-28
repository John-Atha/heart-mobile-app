from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('', Dummy.as_view(), name='Dummy'),
    path('login', TokenObtainPairView.as_view(), name='Login')
]