import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Headline, Surface, ThemeProvider } from 'react-native-paper';
import { LoginForm } from '../components/LoginRegister/LoginForm';
import { RegisterForm } from '../components/LoginRegister/RegisterForm';
import { Layout } from './Layout';

export const LoginRegisterScreen = ({ navigation: { navigate }, ...props }) => {

    const [page, setPage] = useState(props.page);

    let title="Login";
    let content = <LoginForm navigate={navigate} goToRegister={()=>navigate("Register")} />;
    if (page==="register") {
        title="Register";
        content = <RegisterForm navigate={navigate} goToLogin={()=>navigate("Login")} />;
    }

    return (
        <Layout>
            <Surface style={styles.surface}>
                <Image source={require('./logo_heart.png')} style={{ height: 100, width: 160, marginHorizontal: "auto", marginVertical: 16 }} />
                {/* <Headline style={styles.title}>
                    {title}
                </Headline> */}
                { content }
            </Surface>
        </Layout>
    )
}

const styles = StyleSheet.create({
    surface: {
      paddingHorizontal: "4px",
      elevation: 0,
      paddingVertical: "20px",
      backgroundColor: "inherit",
    },
    title: {
        marginBottom: "16px",
        textAlign: "center",
    }
});