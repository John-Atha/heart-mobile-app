from django.urls import path
from api.views_.messages import Messages, MessagesSeen, MessagesSummary
from api.views_.users import *
from api.views_.metrics import Metrics, OneUserMetrics, OneUserMetricsStats
from api.views_.quotes import Quotes
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('', Dummy.as_view(), name='Dummy'),
    path('login', TokenObtainPairView.as_view(), name='Login'),
    path('logged', Logged.as_view(), name='Logged'),
    path('metrics', Metrics.as_view(), name='Metrics'),
    path('users', Users.as_view(), name='Users'),
    path('users/<int:id>', OneUser.as_view(), name='OneUser'),
    path('users/<int:id>/metrics', OneUserMetrics.as_view(), name='OneUserMetrics'),
    path('users/<int:id>/metrics/stats', OneUserMetricsStats.as_view(), name='OneUserMetricsStats'),
    path('messages/summary', MessagesSummary.as_view(), name='MessagesSummary'),
    path('messages', Messages.as_view(), name='Messages'),
    path('messages/seen', MessagesSeen.as_view(), name='MarkMessagesAsSeen'),
    path('quotes', Quotes.as_view(), name='Quotes'),
    path('doctors/<int:id>/patients', DoctorPatients.as_view(), name='DoctorPatients'),
]