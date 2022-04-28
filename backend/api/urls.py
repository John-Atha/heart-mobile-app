from django.urls import path
from api.views_.users import *
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('', Dummy.as_view(), name='Dummy'),
    path('login', TokenObtainPairView.as_view(), name='Login'),
    path('logged', Logged.as_view(), name='Logged'),
    path('users', Users.as_view(), name='Users'),
    path('users/<int:id>', OneUser.as_view(), name='OneUser'),
]