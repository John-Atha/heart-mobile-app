import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Headline, Surface } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/slices/authSlice';
import { LoginForm } from '../components/LoginRegister/LoginForm';
import { RegisterForm } from '../components/LoginRegister/RegisterForm';

export const LoginRegisterScreen = ({ navigation: { navigate }, ...props }) => {

    const [page, setPage] = useState("login");

    let title="Login";
    let content = <LoginForm navigate={navigate} goToRegister={()=>setPage("register")} />;
    if (page==="register") {
        title="Register";
        content = <RegisterForm navigate={navigate} goToLogin={()=>setPage("login")} />;
    }

    return (
        <Surface style={styles.surface}>
            <Headline style={styles.title}>
                {title}
            </Headline>
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
    title: {
        marginBottom: "16px",
        textAlign: "center",
    }
});