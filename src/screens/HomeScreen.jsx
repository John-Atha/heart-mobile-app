import React from 'react'
import { Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-carousel-control';
import { Headline, Subheading } from 'react-native-paper'
import { useSelector } from 'react-redux';
import { StatisticsCard } from '../components/Home/StatisticsCard';
import { data, labels } from '../data/statistics';
import { users } from '../data/users';
import { selectAuth } from '../redux/slices/authSlice';
import { Layout } from './Layout'

export const HomeScreen = ({ page, navigation: {navigate }, ...props }) => {
    console.log("HOME SCREEN RENDERRED");

    const { logged, user: { username } } = useSelector(selectAuth);
   
    return (
        <Layout>
            <Headline style={styles.header}>
                Welcome, {logged ? username : "anonymous"}
            </Headline>
            <Subheading style={styles.subheader}>
                How are you feeling today?
            </Subheading>
            <Carousel pageWidth={Dimensions.get("window").width-10} sneak={23}>
                <StatisticsCard title="Average Heart Rate" labels={labels} data={data} suffix={"p/m"} />
                <StatisticsCard title="Average Blood Pressure" labels={labels} data={data} />
            </Carousel>
            <Carousel pageWidth={Dimensions.get("window").width-10} sneak={23}>
                <StatisticsCard title="Daily Sleep time" labels={labels} data={data} suffix="h" />
                <StatisticsCard title="Daily Excersice time" labels={labels} data={data} suffix="h"/>
            </Carousel>
        </Layout>
    )
}

const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        fontWeight: "bold",
    },
    subheader: {
        textAlign: "center",
    }
})