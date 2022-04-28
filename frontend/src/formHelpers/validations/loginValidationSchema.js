import * as Yup from 'yup';

const email_regexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const required_msg = "Required";

export const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .matches(email_regexp, {
            message: 'Invalid email',
            excludeEmptyStrings: true,
        })
        .required(required_msg),
    password: Yup.string()
        .required(required_msg)
})
