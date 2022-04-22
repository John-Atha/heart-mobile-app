import React from 'react'
import { Headline } from 'react-native-paper'
import { SnackMessage } from '../components/Global/SnackMessage'
import { Screen } from './Screen'

export const HomeScreen = () => {
    return (
        <Screen>
            <Headline>
                I am the home page
            </Headline>
        </Screen>
    )
}