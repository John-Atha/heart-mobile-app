import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Button, Headline, Subheading, Surface, Text, useTheme } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-paper-grid';
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorSummary } from '../api/doctors';
import { queriesKeys } from '../api/queriesKeys'
import { Pie } from '../components/Charts/Pie';
import { SimpleCard } from '../components/Global/SimpleCard';
import { Spinner } from '../components/Global/Spinner';
import { selectAuth } from '../redux/slices/authSlice';
import { setPatient } from '../redux/slices/patientSlice';
import { Layout } from './Layout';

const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        fontWeight: "bold",
    },
    subheader: {
        textAlign: "center",
    }
})

export const DoctorDashboard = ({ navigation: { navigate } }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { user: { first_name } } = useSelector(selectAuth);
    const { data, isLoading, isError } = useQuery(
        queriesKeys['getDoctorSummary'],
        getDoctorSummary,
    );

    const goToProfile = (patient) => {
        dispatch(setPatient(patient));
        navigate("Patients");
    }

    if (isLoading) {
        return <Spinner />;
    }

    let content = null;

    if (isError || !data) {
        ;
    }
    else {
        const {
            patients_total: patientsTotal,
            patients_in_danger: patientsInDanger,
            unseen_messages: unseenMessages,
            notifications,
        } = data;

        content = (
            <>
                <View>
                    <Grid>
                        <Row>
                            <Col>
                                <SimpleCard
                                    title={unseenMessages}
                                    subtitle="New messages"    
                                />
                            </Col>
                            <Col>
                                <SimpleCard
                                    title={
                                        notifications
                                            ?.filter(({ danger }) =>
                                                !!danger?.in_danger
                                            )?.length
                                        || 0
                                    }
                                    subtitle="Notifications"    
                                />
                            </Col>
                        </Row>
                    </Grid>
                </View>
                <Pie
                    data={[
                        {
                            name: "healthy patients",
                            value: patientsTotal-patientsInDanger,
                            color: theme.colors.primary,
                            legendFontColor: theme.colors.primary,
                            legendFontSize: 15
                        },
                        {
                            name: "out of limits",
                            value: patientsInDanger,
                            color: "#948926",
                            legendFontColor: "#948926",
                            legendFontSize: 15
                        }
                    ]}
                />
                {!!notifications
                    ?.filter(({ danger }) =>
                        !!danger?.in_danger
                    )?.length &&
                    <>
                        <Headline style={{ margin: 4 }}>
                            Notifications
                        </Headline>
                        {notifications.map(({ first_name, last_name, id, danger, ...notification }) => {
                            const num = danger?.in_danger_metrics?.length || 0;
                            if (num) {
                                return (
                                    <Surface style={{
                                        padding: 8,
                                        margin: 4,
                                        borderRadius: theme.roundness,
                                    }}>
                                        <Text
                                            component={Button}
                                            style={{
                                                fontSize: 17,
                                            }}
                                            onPress={()=>goToProfile({
                                                firstName: first_name,
                                                lastName: last_name,
                                                id,
                                                danger,
                                                ...notification,
                                            })}
                                        >
                                            {last_name} {first_name} has exceeded {num} {num===1 ? 'limit' : 'limits'} that you have set for him
                                        </Text>
                                    </Surface>
                                )
                            }
                        })}
                    </>
                }
            </>
        )
    }

    return (
        <Layout>
            <Headline style={styles.header}>
                Welcome, {first_name}
            </Headline>
            <Subheading style={styles.subheader}>
                Thank you for helping our people!
            </Subheading>
            {content}
        </Layout>
    )



}