from rest_framework.views import APIView
from rest_framework import permissions
from api.models import Metric
from api.serializers.metrics import MetricSerializer
from api.views_.helpers import OK

class Metrics(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        metrics = Metric.objects.all()
        return OK(MetricSerializer(metrics, many=True).data)
    
