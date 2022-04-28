import * as Yup from 'yup';

const email_regexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const required_msg = "Required";

export const RegisterValidationSchema = Yup.object().shape({
    email: Yup.string()
        .matches(email_regexp, {
            message: 'Invalid email',
            excludeEmptyStrings: true,
        })
        .required(required_msg),
    password: Yup.string()
        .required(required_msg)
        .min(8, "Must be at least 8 characters"),
    confirmation: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Must be the same with the password')
        .required(required_msg),
    firstName: Yup.string()
        .required(required_msg)
        .min(2, "Must be at least 2 characters long")
        .max(40, "Must be at most 40 characters long"),
    lastName: Yup.string()
        .required(required_msg)
        .min(2, "Must be at least 2 characters long")
        .max(40, "Must be at most 40 characters long"),
})
