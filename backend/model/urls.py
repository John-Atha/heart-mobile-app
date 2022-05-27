from django.urls import path
from _views.predictions import Prediction

url_patterns = [
    path('predict', Prediction.as_view(), name="Predict")
]