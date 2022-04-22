import React from 'react'
import { StyleSheet } from 'react-native'
import { Headline, Surface } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { Login } from '../components/LoginRegister/Login'
import { selectAuth } from '../redux/slices/authSlice'

export const LoginRegisterScreen = ({ page, navigation: { navigate } }) => {
    const { logged } = useSelector(selectAuth);

    if (logged) {
        navigate("Home")
    }
    let content = (
        <Login
            navigate={navigate}
        />
    )
    if (page==="register") {
        content = (
            <Headline>
                Register
            </Headline>
        )

    }
    return (
        <Surface style={styles.surface}>
            { content }
        </Surface>
    )
}

const styles = StyleSheet.create({
    surface: {
      padding: "4px",
      margin: "4px",
      marginTop: "20vh",
      elevation: 3,
      paddingVertical: "20px",
    },
});