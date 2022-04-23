import * as Yup from 'yup';

export const PersonalValidationSchema = Yup.object().shape({
    age: Yup.string()
        .nullable(),
    height: Yup.string()
        .nullable(),
    weight: Yup.string()
        .nullable(),
})