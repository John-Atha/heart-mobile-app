import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { HomeScreen } from './screens/HomeScreen';
import { LoginRegisterScreen } from './screens/LoginRegisterScreen';

const Stack = createNativeStackNavigator();

export const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Welcome"
                    component={LoginRegisterScreen}
                    options={{ page: "Login" }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}