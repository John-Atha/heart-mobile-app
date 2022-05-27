from django.db import models

class InputRow(models.Model):
    age = models.IntegerField()
    gender = models.BinaryField()
    ap_hi = models.IntegerField()
    ap_lo = models.IntegerField()
    smoke = models.BinaryField()
    alco = models.BinaryField()
    active = models.BinaryField()
    bmi = models.DecimalField(decimal_places=1, max_digits=3)
    cholesterol_normal = models.BinaryField()
    cholesterol_above_normal = models.BinaryField()
    gluc_normal = models.BinaryField()
    gluc_above_normal = models.BinaryField()
