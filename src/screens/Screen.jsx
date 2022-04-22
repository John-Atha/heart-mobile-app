import React from 'react'
import { StyleSheet } from 'react-native';
import { View } from 'react-native-web'

export const Screen = ({ children }) => {
    return (
        <View style={styles.container}>
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
});