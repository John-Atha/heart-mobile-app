import { Field, Form, Formik, setIn } from 'formik';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Button, Checkbox, Subheading,  Text,  TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfoCall } from '../../api/userInfo';
import { renderHelperText } from '../../formHelpers/helpers/renderHelperText';
import { PersonalValidationSchema } from '../../formHelpers/validations/personalValidationSchema';
import { checkLogged, selectAuth } from '../../redux/slices/authSlice';
import { setSnackMessage } from '../../redux/slices/snackMessageSlice';
import { Col, Grid, Row } from 'react-native-paper-grid'

const baseContainer = {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
};

const styles = StyleSheet.create({
    checkBox: {
        paddingVertical: 0,
    },
    container: {
        ...baseContainer,
        justifyContent: "space-between"
    },
})

export const PatientForm = () => {
    const dispatch = useDispatch();

    const { user: { patient_info, id } } = useSelector(selectAuth);
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        if (patient_info) {
            const { gender, age, weight, height, smoker } = patient_info || {};
            setInitialValues({
                gender: gender===null ? 2 : gender, // 0->Male, 1->Female, 2->Other
                age: age || "",
                weight: weight || "",
                height: height || "",
                smoker: smoker || false,
            })
        }
    }, [patient_info])

    const submit = (values) => {
        const data = {
            patient_info: {
                gender: values.gender,
                height: values.height || null,
                weight: values.weight || null,
                age: values.age || null,
                smoker: values.smoker,
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
            validationSchema={PersonalValidationSchema}
            enableReinitialize
        >
            {({ values, touched, errors, setFieldValue, handleChange, handleBlur, handleSubmit }) => (
                <Form>
                    <View style={styles.container}>
                        <View>
                            <Subheading>Gender</Subheading>
                            <View>
                                <Checkbox.Item
                                    style={styles.checkBox}
                                    status={values.gender==0 ? 'checked' : 'unchecked'}
                                    onPress={()=>setFieldValue("gender", 0)}
                                    label="Male"
                                    position='leading'
                                />
                                <Checkbox.Item
                                    style={styles.checkBox}
                                    status={values.gender==1 ? 'checked' : 'unchecked'}
                                    onPress={()=>setFieldValue("gender", 1)}
                                    label="Female"
                                    position='leading'
                                />
                                <Checkbox.Item
                                    style={styles.checkBox}
                                    status={values.gender==2 ? 'checked' : 'unchecked'}
                                    onPress={()=>setFieldValue("gender", 2)}
                                    label="Other"
                                    position='leading'
                                />
                            </View>
                        </View>
                    </View>
                    <View>
                        <Row>
                            <Col>
                                <Field
                                    as={TextInput}
                                    keyboardType="number-pad"
                                    mode="outlined"
                                    label="Height(m)"
                                    name="height"
                                    onChangeText={handleChange("height")}
                                    onBlur={handleBlur("height")}
                                    error={errors["height"] && touched["height"]}
                                    value={values.height}
                                    errors={errors}
                                    touched={touched}
                                    style={{ marginVertical: 16 }}
                                />
                                { renderHelperText({ name: "height", errors, touched, msg: "Must be a positive number" }) }
                            </Col>
                            <Col>
                                <Field
                                    as={TextInput}
                                    keyboardType="number-pad"
                                    mode="outlined"
                                    label="Weight(kg)"
                                    name="weight"
                                    onChangeText={handleChange("weight")}
                                    onBlur={handleBlur("weight")}
                                    value={values.weight}
                                    error={errors["weight"] && touched["weight"]}
                                    errors={errors}
                                    touched={touched}
                                    style={{ marginVertical: 16 }}
                                />
                                { renderHelperText({ name: "weight", errors, touched, msg: "Must be a positive number" }) }
                            </Col>
                        </Row>
                    </View>
                    <View>
                        <Row>
                            <Col>
                                <Field
                                    as={TextInput}
                                    keyboardType="number-pad"
                                    mode="outlined"
                                    label="Age"
                                    name="age"
                                    onChangeText={handleChange("age")}
                                    onBlur={handleBlur("age")}
                                    value={values.age}
                                    error={errors["age"] && touched["age"]}
                                    errors={errors}
                                    touched={touched}
                                    style={{ marginVertical: 4 }}
                                />
                                { renderHelperText({ name: "age", errors, touched }) }
                            </Col>
                            <Col>
                                <Checkbox.Item
                                    style={{ ...styles.checkbox, width: 50 }}
                                    status={values.smoker ? 'checked' : 'unchecked'}
                                    onPress={()=>setFieldValue("smoker", !values.smoker)}
                                    label="Smoking"
                                    position='leading'
                                />
                            </Col>
                        </Row>
                    </View>
                    <Button style={{ marginVertical: 16, paddingVertical: 8 }} onPress={handleSubmit} mode="contained">
                        Update
                    </Button>
                </Form>
            )}
        </Formik>
    )
}