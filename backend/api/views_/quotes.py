from rest_framework.views import APIView
from rest_framework import permissions
from api.models import Quote
from api.serializers.quotes import QuoteSerializer
from api.views_.helpers import OK

class Quotes(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        quotes = Quote.objects.all()
        return OK(QuoteSerializer(quotes, many=True).data)