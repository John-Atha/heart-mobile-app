import * as Yup from 'yup';

export const PersonalValidationSchema = Yup.object().shape({
    age: Yup.string()
        .nullable(),
    height: Yup.number()
        .nullable()
        .moreThan(0),
    weight: Yup.number()
        .nullable()
        .moreThan(0),
})