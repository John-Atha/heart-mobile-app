import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Button, Checkbox, Subheading,  TextInput } from 'react-native-paper';
import { renderHelperText } from '../../formHelpers/helpers/renderHelperText';
import { PersonalValidationSchema } from '../../formHelpers/validations/personalValidationSchema';

const baseContainer = {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginVertical: 4,
};

const styles = StyleSheet.create({
    checkBox: {
        maxWidth: 100,
        paddingVertical: 0
    },
    container: {
        ...baseContainer,
        justifyContent: "space-between"
    },
    containerCenter: {
        ...baseContainer,
        justifyContent: "center"
    }
})

export const PersonalForm = () => {
    
    const [initialValues, setInitialValues] = useState({
        gender: 2, // 0->Male, 1->Female, 2->Other
        age: "",
        weight: "",
        height: "",
        country: "",
    });

    const submit = (values) => {
        console.log(values);
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={PersonalValidationSchema}
        >
            {({ values, touched, errors, setFieldValue, handleChange, handleBlur, handleSubmit }) => (
                <Form>
                    <View style={styles.container}>
                        <View>
                            <Subheading>Gender</Subheading>
                            <View style={{ display: "flex" }}>
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
                        <View>
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
                            <Field
                                as={TextInput}
                                keyboardType="number-pad"
                                mode="outlined"
                                label="Country"
                                name="country"
                                onChangeText={handleChange("country")}
                                onBlur={handleBlur("country")}
                                value={values.country}
                                errors={errors}
                                touched={touched}
                                style={{ marginVertical: 4 }}
                            />
                            { renderHelperText({ name: "country", errors, touched }) }
                        </View>
                    </View>
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
                    { renderHelperText({ name: "weight", errors, touched, msg: "Must be a number" }) }
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
                    { renderHelperText({ name: "weight", errors, touched }) }
                    <Button style={{ marginVertical: 16, paddingVertical: 8 }} onPress={handleSubmit} mode="contained">
                        Update
                    </Button>
                </Form>
            )}
        </Formik>
    )
}