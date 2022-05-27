from rest_framework import serializers
from rest_framework import permissions
from model.models import * 

class InputRowSerializer(serializers.ModelSerializer):
    permission_classes = [permissions.AllowAny]
    class Meta:
        model = InputRow
        fields = [
            'age',
            'gender',
            'ap_hi',  
            'ap_lo',  
            'smoke', 
            'alco', 
            'active', 
            'bmi', 
            'cholesterol_normal', 
            'cholesterol_above_normal', 
            'gluc_normal', 
            'gluc_above_normal', 
        ]