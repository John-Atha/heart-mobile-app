import React from 'react'
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux'
import { Layout } from './Layout'
import { logout } from '../redux/slices/authSlice';

export const AccountScreen = () => {
    const dispatch = useDispatch();

    return (
        <Layout>
            I am the account screen
            <Button mode="contained" onPress={()=>dispatch(logout())} >
                Logout
            </Button>
        </Layout>
    )
}