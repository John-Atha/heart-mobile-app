import * as Yup from 'yup';

export const DoctorValidationSchema = Yup.object().shape({
    description: Yup.string()
        .nullable()
        .max(2000, "Must be less than 2000 characters"),
    expertise: Yup.string()
        .nullable()
        .max(50, "Must be less than 50 characters"),
})