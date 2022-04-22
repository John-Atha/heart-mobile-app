import { Field, Form, Formik } from 'formik'
import React from 'react'
import { TextInput } from 'react-native-paper'

export const Register = () => {
    const initialValues = {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmation: "",
    }

    const submit = (values) => {
        console.log(values);
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submit}
        >
            {({ values, touched, errors }) => (
                <Form>
                    <Field
                        as={TextInput}
                        mode="outlined"
                        label="Email"
                        name="email"
                        placeholder="example@gmail.com"
                        right={<TextInput.Icon name="email" />}
                    />
                    <Field
                        as={TextInput}
                        mode="outlined"
                        label="First name"
                        name="firstName"
                        placeholder="George"
                    />
                    <Field
                        as={TextInput}
                        mode="outlined"
                        label="Last name"
                        name="lastName"
                        placeholder="Right"
                    />
                    <Field
                        as={TextInput}
                        mode="outlined"
                        label="Password"
                        name="password"
                        secureTextEntry
                        right={<TextInput.Icon name="eye" />}
                    />
                    <Field
                        as={TextInput}
                        mode="outlined"
                        label="Confirmation"
                        name="confirmation"
                        secureTextEntry
                        right={<TextInput.Icon name="eye" />}
                    />
                </Form>
            )}
        </Formik>
    )
}