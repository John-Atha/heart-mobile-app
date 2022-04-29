import React from 'react'
import { Button, Divider, Headline, Surface, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from './Layout'
import { logout, selectAuth } from '../redux/slices/authSlice';
import { StyleSheet, Text, View } from 'react-native';
import { PatientForm } from '../components/Account/PatientForm';
import { DoctorForm } from '../components/Account/DoctorForm';

export const AccountScreen = () => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: 4,
        }
    })

    const dispatch = useDispatch();
    const { user: { username }, isDoctor } = useSelector(selectAuth);

    const renderForm = () => {
        if (isDoctor) {
            return <DoctorForm />
        }
        return <PatientForm />
    }

    return (
        <Layout>
            <View style={styles.container}>
                <Headline>
                    {username}
                </Headline>
                <Button mode="contained" onPress={()=>dispatch(logout())} >
                    Logout
                </Button>
            </View>
            <Divider style={{ margin: 8}} />
            <Surface style={{ backgroundColor: "white", paddingHorizontal: 4, borderRadius: theme.roundness, elevation: theme.elevation }}>
                { renderForm() }
            </Surface>
        </Layout>
    )
}