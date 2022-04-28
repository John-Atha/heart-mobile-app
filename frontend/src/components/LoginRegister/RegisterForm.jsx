import AsyncStorage from '@react-native-async-storage/async-storage'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Checkbox, RadioButton, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { registerCall } from '../../api/auth'
import { users } from '../../data/users'
import { renderHelperText } from '../../formHelpers/helpers/renderHelperText'
import { RegisterValidationSchema } from '../../formHelpers/validations/registerValidationSchema'
import { checkLogged, fill } from '../../redux/slices/authSlice'
import { setSnackMessage } from '../../redux/slices/snackMessageSlice'

export const RegisterForm = ({ navigate, goToLogin }) => {
    const dispatch = useDispatch();
    const [isDoctor, setIsDoctor] = useState(false);

    const initialValues = {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmation: "",
    }

    const submit = (values) => {
        registerCall({ ...values, username: values['email'], first_name: values.firstName, last_name: values.lastName })
        .then(async (response) => {
            console.log(response.data);
            const token = response.data["access"];
            dispatch(setSnackMessage({
                text: "Welcome",
                severity: "success",
            }))
            console.log("filling token...")
            await AsyncStorage.setItem("@token", token);
            // localStorage.setItem(token, "my-secret-token");
            console.log(values);
            setTimeout(() => {
                dispatch(checkLogged());
            }, 500)
        })
        .catch(err => {
            console.log(err);
            dispatch(setSnackMessage({
                text: "Invalid credentials",
                severity: "error",
            }))
        })
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={RegisterValidationSchema}
        >
            {({ values, touched, errors, handleBlur, handleChange, handleSubmit }) => (
                <Form>
                    <Field
                        as={TextInput}
                        mode="outlined"
                        label="Email"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        name="email"
                        placeholder="example@gmail.com"
                        right={<TextInput.Icon name="email" />}
                        errors={errors}
                        touched={touched}
                    />
                    { renderHelperText({ name: "email", errors, touched }) }
                    <Field
                        as={TextInput}
                        mode="outlined"
                        label="First name"
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        value={values.firstName}
                        name="firstName"
                        placeholder="George"
                        errors={errors}
                        touched={touched}
                    />
                    { renderHelperText({ name: "firstName", errors, touched }) }
                    <Field
                        as={TextInput}
                        mode="outlined"
                        label="Last name"
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                        value={values.lastName}
                        name="lastName"
                        placeholder="Right"
                        errors={errors}
                        touched={touched}
                    />
                    { renderHelperText({ name: "lastName", errors, touched }) }
                    <Field
                        as={TextInput}
                        mode="outlined"
                        label="Password"
                        name="password"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry
                        right={<TextInput.Icon name="eye" />}
                        errors={errors}
                        touched={touched}
                    />
                    { renderHelperText({ name: "password", errors, touched }) }
                    <Field
                        as={TextInput}
                        mode="outlined"
                        label="Confirmation"
                        name="confirmation"
                        onChangeText={handleChange('confirmation')}
                        onBlur={handleBlur('confirmation')}
                        value={values.confirmation}
                        secureTextEntry
                        right={<TextInput.Icon name="eye" />}
                        errors={errors}
                        touched={touched}
                    />
                    { renderHelperText({ name: "confirmation", errors, touched }) }
                    <Checkbox.Item
                        style={{ maxWidth: 180}}
                        status={isDoctor ? 'checked' : 'unchecked'}
                        onPress={()=>setIsDoctor(!isDoctor)}
                        label="I am a doctor"
                        position='leading'
                    />
                    <Button
                        mode="contained"
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        Register
                    </Button>
                    <Button mode="text" onPress={goToLogin} style={styles.link}>
                        I already have an account
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: "16px",
        padding: "4px",
        maxWidth: "300px",
        margin: "auto",
    },
    link: {
        textTransform: "none",
        marginTop: "16px",
    }
})