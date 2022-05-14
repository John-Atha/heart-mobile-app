import React from 'react'
import { Button, Divider, Headline, Surface, useTheme } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from './Layout';
import { selectAuth } from '../redux/slices/authSlice';
import { MetricsForm } from '../components/Patients/MetricsForm';
import Carousel from 'react-native-carousel-control';
import { Dimensions } from 'react-native-web';
import { StatisticsCard } from '../components/Home/StatisticsCard';
import { dataa, labels } from '../data/statistics';

export const PatientMetrics = () => {
    const theme = useTheme();

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

    return (
        <Layout>
            <View style={styles.container}>
                <Headline>
                    My metrics
                </Headline>
            </View>
            <Divider style={{ margin: 8}} />
            {/* <Surface style={{
                backgroundColor: "white",
                padding: 4,
                borderRadius: theme.roundness,
                elevation: theme.elevation,
            }}>
                <MetricsForm />
            </Surface> */}
            <div style={{ marginTop: 5 }} />
            <Carousel pageWidth={Dimensions.get("window").width-10} sneak={23}>
                <StatisticsCard title="Average Heart Rate" labels={labels} data={dataa} suffix={"p/m"} />
                <StatisticsCard title="Average Blood Pressure" labels={labels} data={dataa} />
            </Carousel>
            <div style={{ marginTop: 5 }} />
            <Carousel pageWidth={Dimensions.get("window").width-10} sneak={23}>
                <StatisticsCard title="Daily Sleep time" labels={labels} data={dataa} suffix="h" />
                <StatisticsCard title="Daily Excersice time" labels={labels} data={dataa} suffix="h"/>
            </Carousel>
        </Layout>
    )
}