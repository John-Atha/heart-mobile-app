import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Headline, Surface } from 'react-native-paper';
import { LoginForm } from '../components/LoginRegister/LoginForm';
import { RegisterForm } from '../components/LoginRegister/RegisterForm';
import { Layout } from './Layout';

export const LoginRegisterScreen = ({ navigation: { navigate }, ...props }) => {

    const [page, setPage] = useState("login");

    let title="Login";
    let content = <LoginForm navigate={navigate} goToRegister={()=>setPage("register")} />;
    if (page==="register") {
        title="Register";
        content = <RegisterForm navigate={navigate} goToLogin={()=>setPage("login")} />;
    }

    return (
        <Layout>
            <Surface style={styles.surface}>
                <Headline style={styles.title}>
                    {title}
                </Headline>
                { content }
            </Surface>
        </Layout>
    )
}

const styles = StyleSheet.create({
    surface: {
      paddingHorizontal: "4px",
      elevation: 3,
      paddingVertical: "20px",
      backgroundColor: "inherit",
      elevation: 0,
    },
    title: {
        marginBottom: "16px",
        textAlign: "center",
    }
});