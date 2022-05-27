from django.shortcuts import render
from rest_framework.views import APIView
from model.models import InputRow
from model.serializers.predictions import InputRowSerializer
from .helpers import OK, BadRequestException, Deleted, NotFoundException, SerializerErrors, UnAuthorizedException
from sklearn.preprocessing import StandardScaler
import joblib
import json
import pandas as pd
import numpy as np
from keras.models import load_model
import os

class Prediction(APIView):
    def post(self, request):
        """ Expected body will look like:
        body : {
            'age' : 23, ,- int
            'gender' : 0, <- bin 
            'ap_hi' : 15.0, <- float
            'ap_lo' : 8.0, <- float
            'smoke' : True, <- bool
            'alco' : False, <- bool
            'active' : True, <- bool
            'height' : 189, <- int
            'weight' : 80.0 , <- float
            'cholesterol_normal': 1, <- bin
            'cholesterol_above_normal': 0, <- bin
            'gluc_normal': 0, <- bin
            'gluc_above_normal' : 1, <- bin
        } 
        """
        print(os.getcwd())
        try:
            body = json.loads(request.body)
        except Exception:
            return BadRequestException("Invalid body structure")
        print(body)
        scaler = joblib.load('./model/saved_objects/scaler.h5')
        ap_hi = body['ap_hi'] * 10
        ap_lo = body['ap_lo'] * 10
        smoke = 1 if body['smoke'] else 0
        alco = 1 if body['alco'] else 0 
        active = 1 if body['active'] else 0
        bmi = round(body['weight'] // (body['height']/100)**2, 1)
        data = {
            'age':body['age'],
            'gender':body['gender'],
            'ap_hi':ap_hi,
            'ap_lo':ap_lo,
            'smoke':smoke,
            'alco':alco,
            'active':active,
            'bmi':bmi,
            'cholesterol_normal': body['cholesterol_normal'],
            'cholesterol_above_normal': body['cholesterol_above_normal'],
            'gluc_normal': body['gluc_normal'],
            'gluc_above_normal': body['gluc_above_normal']
        }
        row = InputRowSerializer(data=data)
        if row.is_valid():
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
                pred_class = 0
            elif prediction[0][0] > 0.35 and prediction[0][0] < 0.7:
                pred_class = 1
            else:
                pred_class = 2
            return OK({'class':pred_class,
                       'data':data
                      })
        return SerializerErrors(row)
