import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

export const Layout = ({ children }) => {

    const height = useWindowDimensions().height;

    const styles = StyleSheet.create({
        scrollable: {
            maxHeight: height,
            paddingBottom: "150px",
        },
        container: {
            display: "flex",
            flexDirection: "column",
            alignContent: "space-between",
        },
    })
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollable}>
                { children }
            </ScrollView>
        </SafeAreaView>
    )
}
