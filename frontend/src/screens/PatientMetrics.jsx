import React, { useState } from 'react'
import { Button, Divider, Headline, useTheme } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native';
import { Layout } from './Layout';
import { MetricsStats } from '../components/Patients/MetricsStats';
import { MetricsAnalytics } from '../components/Patients/MetricsAnalytics';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/slices/authSlice';
import Tabs from '../components/Global/Tabs';
import { Col, Grid, Row } from 'react-native-paper-grid';

export const PatientMetrics = () => {
    const theme = useTheme();
    const [page, setPage] = useState("Statistics");

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: 4,
        }
    });

    const { user: { id } } = useSelector(selectAuth);

    return (
        <Layout>
            <View style={styles.container}>
                <Headline>
                    My metrics
                </Headline>
            </View>
            <Divider style={{ margin: 8}} />
            <Tabs
                views={{
                    "Statistics": <MetricsStats />,
                    "Analytics": <MetricsAnalytics id={id} />,
                }}
            />
        </Layout>
    )
}