import React from 'react'
import { StyleSheet } from 'react-native';
import { View } from 'react-native-web'

export const Layout = ({ children }) => {
    return (
        <View style={styles.container}>
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignContent: "space-between",
    },
});