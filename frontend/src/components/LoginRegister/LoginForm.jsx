import AsyncStorage from '@react-native-async-storage/async-storage'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, TextInput, useTheme } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { users } from '../../data/users'
import { renderHelperText } from '../../formHelpers/helpers/renderHelperText'
import { LoginValidationSchema } from '../../formHelpers/validations/loginValidationSchema'
import { checkLogged, fill } from '../../redux/slices/authSlice'
import { setSnackMessage } from '../../redux/slices/snackMessageSlice'
// import { TextInput } from 'react-native';
export const LoginForm = ({ navigate, goToRegister }) => {
    const theme = useTheme();

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
        },
    })

    const initialValues = {
        email: "",
        password: "",
    }
    const dispatch = useDispatch();
    
    const submit = async (values) => {
        dispatch(setSnackMessage({
            text: "Welcome",
            severity: "success",
        }))
        console.log("filling token...")
        await AsyncStorage.setItem("@token", "my-secret-key");
        // localStorage.setItem(token, "my-secret-token");
        console.log(values);
        setTimeout(() => {
            dispatch(checkLogged());
        }, 500)
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={LoginValidationSchema}
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
                        error={errors["email"] && touched["email"]}
                        errors={errors}
                        touched={touched}
                    />
                    { renderHelperText({ name: "email", errors, touched }) }
                    <Field
                        as={TextInput}
                        mode="outlined"
                        label="Password"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry
                        right={<TextInput.Icon name="eye" />}
                        error={errors["password"] && touched["password"]}
                        errors={errors}
                        touched={touched}
                    />
                    { renderHelperText({ name: "password", errors, touched }) }
                    <Button
                        mode="contained"
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        Login
                    </Button>
                    <Button mode="text" onPress={goToRegister} style={styles.link}>
                        First time here?
                    </Button>
                </Form>
            )}
        </Formik>
    )
}
