import React from 'react'
import { View } from 'react-native'
import Carousel from 'react-native-carousel-control'
import { StatisticsCard } from '../Home/StatisticsCard'
import { labels, dataa } from '../../data/statistics';
import { Dimensions } from 'react-native-web';

export const MetricsStats = () => {
    return (
        <View>
            <Carousel pageWidth={Dimensions?.get("window").width-10 || 200} sneak={23}>
                <StatisticsCard title="Average Heart Rate" labels={labels} data={dataa} suffix={"p/m"} />
                <StatisticsCard title="Average Blood Pressure" labels={labels} data={dataa} />
            </Carousel>
            <div style={{ marginTop: 5 }} />
            <Carousel pageWidth={Dimensions?.get("window").width-10 || 200} sneak={23}>
                <StatisticsCard title="Daily Sleep time" labels={labels} data={dataa} suffix="h" />
                <StatisticsCard title="Daily Excersice time" labels={labels} data={dataa} suffix="h"/>
            </Carousel>
        </View>
    )
}