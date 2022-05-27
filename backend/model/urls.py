from django.urls import path
from model._views.predictions import Prediction

urlpatterns = [
    path('predict', Prediction.as_view(), name="Predict")
]