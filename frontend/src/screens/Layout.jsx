import React from 'react'
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Layout = ({ children }) => {

    const height = useWindowDimensions().height;

    const styles = StyleSheet.create({
        scrollable: {
            maxHeight: "inherit",
            paddingHorizontal: 4,
            // paddingBottom: "150px",
        },
        container: {
            flex: 1,
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
