import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-carousel-control';
import { Headline, Subheading, Surface, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux';
import { Quotes } from '../components/Home/Quotes';
import { StatisticsCard } from '../components/Home/StatisticsCard';
import { MetricsForm } from '../components/Patients/MetricsForm';
import { users } from '../data/users';
import { selectAuth } from '../redux/slices/authSlice';
import { Layout } from './Layout'

export const HomeScreen = ({ page, navigation: {navigate }, ...props }) => {
    const theme = useTheme();
    const { logged, user: { username, first_name } } = useSelector(selectAuth);
   
    return (
        <Layout>
            <Headline style={styles.header}>
                Welcome, {logged ? first_name : username}
            </Headline>
            <Subheading style={styles.subheader}>
                How are you feeling today?
            </Subheading>
            <Surface style={{ marginTop: 20, padding: 5, borderRadius: theme.roundness }}>
                <MetricsForm />
            </Surface>
            <View style={{ marginTop: 10 }}>
                <Quotes />
            </View>
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