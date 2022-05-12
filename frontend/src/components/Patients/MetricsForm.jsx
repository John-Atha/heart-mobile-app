import { Field, Form, Formik } from 'formik';
import React from 'react'
import { Button, Headline, Subheading, Text, TextInput } from 'react-native-paper';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux'
import { getLatestMetrics } from '../../api/metrics';
import { queriesKeys } from '../../api/queriesKeys';
import { MetricsValidationSchema } from '../../formHelpers/validations/metricsValidationSchema';
import { selectAuth } from '../../redux/slices/authSlice';
import { Spinner } from '../Global/Spinner';
import { StyleSheet, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-paper-grid';
import { renderHelperText } from '../../formHelpers/helpers/renderHelperText';

export const MetricsForm = () => {
    const { user: { id } } = useSelector(selectAuth);

    const { data, isLoading } = useQuery(
        [queriesKeys['getLastMetrics'], id],
        () => getLatestMetrics(id), {
            enabled: !!id,
            cacheTime: 0,
            refetchOnWindowFocus: false,
        }
    );

    const submit = (values) => {
        console.log(values);
    }

    const renderForm = () => {
        
        const initialValues = {
            cholesterol: data?.cholesterol || "",
            heart_rate: data?.heart_rate || "",
            systolic_pressure: data?.systolic_pressure || "",
            diastolic_pressure: data?.diastolic_pressure || "",
            open: data?.open || true,   
        };

        return (
            <Formik
                initialValues={initialValues}
                onSubmit={submit}
                validationSchema={MetricsValidationSchema}
                enableReinitialize
            >
                {({ values, touched, errors, setFieldValue, handleChange, handleBlur, handleSubmit }) => (
                    <Form>
                        <View>
                            <Grid>
                                <Row>
                                    <Col>
                                        <Field
                                            as={TextInput}
                                            keyboardType="number"
                                            mode="outlined"
                                            label="Cholesterol"
                                            name="cholesterol"
                                            onChangeText={handleChange("cholesterol")}
                                            onBlur={handleBlur("cholesterol")}
                                            error={errors["cholesterol"]}
                                            value={values["cholesterol"]}
                                            errors={errors}
                                            touched={touched}
                                            disabled={!open}
                                        />
                                        { renderHelperText({name: "cholesterol", errors, touched, msg: "Must be a positive number" }) }
                                    </Col>
                                    <Col>
                                        <Field
                                            as={TextInput}
                                            keyboardType="number"
                                            mode="outlined"
                                            label="Heart Rate (p/m)"
                                            name="heart_rate"
                                            onChangeText={handleChange("heart_rate")}
                                            onBlur={handleBlur("heart_rate")}
                                            error={errors["heart_rate"]}
                                            value={values["heart_rate"]}
                                            errors={errors}
                                            touched={touched}
                                            disabled={!open}
                                        />
                                        { renderHelperText({name: "heart_rate", errors, touched, msg: "Must be a positive number" }) }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Field
                                            as={TextInput}
                                            keyboardType="number"
                                            mode="outlined"
                                            label="Systolic pressure"
                                            name="systolic_pressure"
                                            onChangeText={handleChange("systolic_pressure")}
                                            onBlur={handleBlur("systolic_pressure")}
                                            error={errors["systolic_pressure"]}
                                            value={values["systolic_pressure"]}
                                            errors={errors}
                                            touched={touched}
                                            disabled={!open}
                                        />
                                        { renderHelperText({name: "systolic_pressure", errors, touched, msg: "Must be a positive number" }) }
                                    </Col>
                                    <Col>
                                        <Field
                                            as={TextInput}
                                            keyboardType="number"
                                            mode="outlined"
                                            label="Diastolic pressure"
                                            name="diastolic_pressure"
                                            onChangeText={handleChange("diastolic_pressure")}
                                            onBlur={handleBlur("diastolic_pressure")}
                                            error={errors["diastolic_pressure"]}
                                            value={values["diastolic_pressure"]}
                                            errors={errors}
                                            touched={touched}
                                            disabled={!open}
                                        />
                                        { renderHelperText({name: "diastolic_pressure", errors, touched, msg: "Must be a positive number" }) }
                                    </Col>
                                </Row>
                            </Grid>
                            <Button
                                onPress={handleSubmit}
                                mode="contained"
                                disabled={!open}
                            >
                                Submit
                            </Button>
                        </View>
                    </Form>
                )}
            </Formik>
        )
    }

    if (isLoading) {
        return <Spinner />;
    }


    return (
        <>
            {true &&
                <Subheading style={{ textAlign: "center" }}>
                    You have already inserted your metrics for today
                    You can add them again tommorow
                </Subheading>
            }
            { renderForm() }
        </>
    )    
}