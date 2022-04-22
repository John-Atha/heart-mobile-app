import React from 'react'
import { StyleSheet } from 'react-native'
import { Headline } from 'react-native-paper'
import { LoginForm } from './LoginForm'

export const Login = ({ navigate }) => {
    return (
        <>
            <Headline style={styles.title}>
                Login
            </Headline>
            <LoginForm
                navigate={navigate}
            />
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        marginBottom: "16px",
        textAlign: "center",
    }
});