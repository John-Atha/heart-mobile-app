import React from 'react'
import { Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-carousel-control';
import { Headline, Subheading } from 'react-native-paper'
import { useSelector } from 'react-redux';
import { StatisticsCard } from '../components/Home/StatisticsCard';
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