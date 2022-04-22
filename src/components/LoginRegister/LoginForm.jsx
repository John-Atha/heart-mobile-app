import { Field, Form, Formik } from 'formik'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { users } from '../../data/users'
import { renderHelperText } from '../../formHelpers/helpers/renderHelperText'
import { LoginValidationSchema } from '../../formHelpers/validations/loginValidationSchema'
import { fill } from '../../redux/slices/authSlice'
import { setSnackMessage } from '../../redux/slices/snackMessageSlice'
// import { TextInput } from 'react-native';
export const LoginForm = ({ navigate }) => {
    const initialValues = {
        email: "",
        password: "",
    }
    const dispatch = useDispatch();
    
    const submit = (values) => {
        const user = users[3];
        dispatch(fill({
            user,
            token: "my-secret-token",
            logged: true,
            isDoctor: user.isDoctor
        }));
        dispatch(setSnackMessage({
            text: "Welcome",
            severity: "success",
        }))
        console.log(values);
        setTimeout(() => {
            navigate("Home");
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
    }
})