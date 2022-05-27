import React from 'react'
import { View } from 'react-native'
import Carousel from 'react-native-carousel-control'
import { StatisticsCard } from '../Home/StatisticsCard'
import { labels, dataa } from '../../data/statistics';
import { Dimensions } from 'react-native-web';
import { useQuery } from 'react-query';
import { queriesKeys } from '../../api/queriesKeys';
import { getUserMetricsStats } from '../../api/metrics';
import { Spinner } from '../Global/Spinner';

export const MetricsStats = (id) => {
    const { data, isLoading, isError } = useQuery(
        [queriesKeys['getMetricsStats'], id],
        () => getUserMetricsStats(id), {
            enabled: !!id,
        }
    );
    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return null;
    }

    const keys = Object.keys(data);
    const values = (name) => {
        return Object.values(data)
            .map((datum) => datum[name])
            .filter((val) => !!val);
    }

    return (
        <View>
            <Carousel pageWidth={Dimensions?.get("window").width-10 || 200} sneak={23}>
                <StatisticsCard title="Average Cholesterol" labels={keys} data={values("Cholesterol")} suffix={"p/m"} />
                <StatisticsCard title="Average Glucose" labels={keys} data={values("Glucose")} />
            </Carousel>
            <div style={{ marginTop: 5 }} />
            <Carousel pageWidth={Dimensions?.get("window").width-10 || 200} sneak={23}>
                <StatisticsCard title="Average Systolic Pressure" labels={keys} data={values("Systolic blood pressure")} suffix="h" />
                <StatisticsCard title="Average Diastolic Pressure" labels={keys} data={values("Diastolic blood pressure")} suffix="h"/>
            </Carousel>
        </View>
    )
}