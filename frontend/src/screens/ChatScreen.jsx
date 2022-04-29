import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Headline, Surface, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Contacts } from '../components/Chat/Contacts'
import { Messages } from '../components/Chat/Messages'
import { getDoctors } from '../data/doctors'
import { clearContact, selectChatContact } from '../redux/slices/chatSlice'
import { Layout } from './Layout'

export const ChatScreen = ({ navigation: { navigate } }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { selectedContact } = useSelector(selectChatContact);

    useEffect(() => {
        return () => dispatch(clearContact());
    }, [])

    if (selectedContact) {
        return <Messages contact={selectedContact} navigate={navigate} />;
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background2 }}>
            <Headline style={{ paddingLeft: 8 }}>
                Contacts
            </Headline>
            <Surface style={{ borderRadius: theme.roundness, flex: 1, marginBottom: 4, elevation: theme.elevation, margin: 4 }}>
                <ScrollView style={{ maxHeight: "inherit" }}>
                        <Contacts navigate={navigate} />
                </ScrollView>
            </Surface>
        </SafeAreaView>
    )
}