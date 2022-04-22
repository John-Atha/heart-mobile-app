import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { HomeScreen } from '../screens/HomeScreen';
import { LoginRegisterScreen } from '../screens/LoginRegisterScreen';

const Stack = createNativeStackNavigator();

export const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home"
                    component={HomeScreen}
                />
                <Stack.Screen name="Login">
                    {(props) => LoginRegisterScreen({ page: "login", ...props })}
                </Stack.Screen>
                <Stack.Screen name="Register">
                    {(props) => LoginRegisterScreen({ page: "register", ...props })}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}