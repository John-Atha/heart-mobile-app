from django.shortcuts import render
from rest_framework.views import APIView
from model.models import InputRow
from model.serializers.predictions import InputRowSerializer
from .helpers import OK, BadRequestException, Deleted, NotFoundException, SerializerErrors, UnAuthorizedException
from sklearn.preprocessing import StandardScaler, binarize
import joblib
import json
import pandas as pd
import numpy as np
from keras.models import load_model
import os

class Prediction(APIView):
    def predict_risk(self, data):
        scaler = joblib.load('./model/saved_objects/scaler.h5')
        columns = joblib.load('./model/saved_objects/x_train_columns.h5')
        to_be_scaled_feat = ['age', 'ap_hi', 'ap_lo','bmi']

        row_list = list(data.values())
        new_list = [[]]
        new_list[0] = row_list
        print(row_list)
        row_df = pd.DataFrame(new_list, columns=columns)
        row_df[to_be_scaled_feat] = scaler.transform(row_df[to_be_scaled_feat])

        model = load_model('./model/saved_objects/cdv_dnn_model.h5')
        prediction = model.predict(row_df)

        print("Prediction for input is: ", prediction[0][0])
        if prediction[0][0] < 0.35:
            return 0, prediction[0][0]
        elif prediction[0][0] > 0.35 and prediction[0][0] < 0.7:
            return 1, prediction[0][0]
        else:
            return 2, prediction[0][0]

    def post(self, request):
        """ Expected body will look like:
        body : {
            'age', int
            'gender', 0,1 or 2 (2 will count as 0)
            'height', float e.g. 1.78m
            'weight', int e.g. 100kg
            'systolic_pressure', float(1 decimal) e.g. 15.0
            'diastolic_pressure', same
            'smoking', bool
            'drinking', bool
            'exercising', bool
            'cholesterol', int (e.g. 150)
            'glucose' int (e.g. 150)
        } 
        """
        print(os.getcwd())
        try:
            body = json.loads(request.body)
        except Exception:
            return BadRequestException("Invalid body structure")
        print(body)
        
        if body == {}:
            return OK({
                        "class":0
                      })

        age = body.get('age') or 53
        gender = body.get('gender') or 1
        height = body.get('height') or 1.65
        weight = body.get('weight') or 74
        ap_hi = body['systolic_pressure'] * 10 if body.get('systolic_pressure') else 129
        ap_lo = body['diastolic_pressure'] * 10 if body.get('diastolic_pressure') else 98
        smoke = 1 if body.get('smoking') else 0
        alco = 1 if body.get('drinking') else 0 
        if body.get('exercising'):
            if body['exercising']:
                active = 1
            else:
                active = 0
        else:
            active = 1
        bmi = round(weight // (height)**2, 1)
        if body.get('glucose'):
            gluc_normal = 1 if body['glucose'] < 100 else 0
            gluc_above_normal = 1 if body['glucose']>=100 else 0
        else:
            gluc_normal = 1
            gluc_above_normal = 0
        if body.get('cholesterol'):
            cholesterol_normal = 1 if body['cholesterol'] < 240 else 0
            cholesterol_above_normal = 1 if body['cholesterol'] >= 240 else 0
        else:
            cholesterol_normal = 1
            cholesterol_above_normal = 0
        data = {
            'age':age,
            'gender':gender,
            'ap_hi':ap_hi,
            'ap_lo':ap_lo,
            'smoke':smoke,
            'alco':alco,
            'active':active,
            'bmi':bmi,
            'cholesterol_normal': cholesterol_normal,
            'cholesterol_above_normal': cholesterol_above_normal,
            'gluc_normal': gluc_normal,
            'gluc_above_normal': gluc_above_normal
        }
        row = InputRowSerializer(data=data)
        if row.is_valid():
            pred_class, exact = self.predict_risk(data)
            return OK({ 'exact_output':exact,
                        'class':pred_class,
                        'data':data
                      })
        return SerializerErrors(row)
