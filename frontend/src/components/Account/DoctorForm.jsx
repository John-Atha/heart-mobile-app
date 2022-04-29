import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { updateUserInfoCall } from '../../api/userInfo';
import { renderHelperText } from '../../formHelpers/helpers/renderHelperText';
import { DoctorValidationSchema } from '../../formHelpers/validations/doctorValidationSchema';
import { checkLogged, selectAuth } from '../../redux/slices/authSlice'
import { setSnackMessage } from '../../redux/slices/snackMessageSlice';

const styles = StyleSheet.create({
    marginTop: {
        marginTop: 8,
    }
});

export const DoctorForm = () => {
    const dispatch = useDispatch();
    const { user: { doctor_info, id } } = useSelector(selectAuth);

    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        if (doctor_info) {
            const { description, expertise } = doctor_info;
            setInitialValues({
                description: description || "",
                expertise: expertise || "",
            });
        }
    }, [doctor_info])

    const submit = (values) => {
        const data = {
            doctor_info: {
                expertise: values.expertise || null,
                description: values.description || null,
            }
        }
        updateUserInfoCall(data, id)
        .then(response => {
            console.log(response.data);
            dispatch(setSnackMessage({
                text: "Info updated successfully",
                severity: "success",
            }));
            setTimeout(() => {
                dispatch(checkLogged());
            }, 500)
        })
        .catch(err => {
            console.log(err);
            dispatch(setSnackMessage({
                text: "Sorry, we could not update your info",
                severity: "error",
            }));
        })
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={DoctorValidationSchema}
            enableReinitialize
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <Form>
                    <Field
                        as={TextInput}
                        mode="outlined"
                        label="Expertise"
                        name="expertise"
                        onChangeText={handleChange("expertise")}
                        onBlur={handleBlur("expertise")}
                        value={values.expertise}
                        error={errors["expertise"] && touched["expertise"]}
                        errors={errors}
                        touched={touched}
                        style={styles.marginTop}
                    />
                    { renderHelperText({ name: "expertise", errors, touched })}

                    <Field
                        as={TextInput}
                        mode="outlined"
                        label="Description"
                        name="description"
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={handleChange("description")}
                        onBlur={handleBlur("description")}
                        value={values.description}
                        error={errors["description"] && touched["description"]}
                        errors={errors}
                        touched={touched}
                        style={styles.marginTop}
                    />
                    { renderHelperText({ name: "description", errors, touched })}
                    <Button
                        mode="contained"
                        onPress={handleSubmit}
                        style={{ marginTop: 16 }}
                    >
                        Update
                    </Button>
                </Form>
            )}

        </Formik>
    )
}