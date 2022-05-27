import * as Yup from 'yup';

export const MetricsValidationSchema = Yup.object().shape({
    cholesterol: Yup.number("Must be a number")
        .nullable()
        .moreThan(0, "Must be a positive number"),
    heart_rate: Yup.number("Must be a number")
        .nullable()
        .moreThan(0, "Must be a positive number"),
    systolic_pressure: Yup.number("Must be a number")
        .moreThan(0, "Must be a positive number")
        .nullable(),
    diastolic_pressure: Yup.number("Must be a number")
        .moreThan(0, "Must be a positive number")    
        .nullable(),
})