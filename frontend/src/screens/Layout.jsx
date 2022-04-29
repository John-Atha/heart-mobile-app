import React from 'react'
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Layout = ({ children }) => {

    const theme = useTheme();

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
            backgroundColor: theme.colors.background2,
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
