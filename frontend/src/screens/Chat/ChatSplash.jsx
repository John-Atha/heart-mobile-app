import React from 'react'
import { ScrollView } from 'react-native';
import { Headline, Surface, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Contacts } from '../../components/Chat/Contacts';
import { selectChatContact } from '../../redux/slices/chatSlice';

export const ChatSplash = ({ navigation: { navigate } }) => {
    const theme = useTheme();
    const { selectedContact } = useSelector(selectChatContact);

    if (selectedContact) {
        setTimeout(() => {
            navigate("ChatContact");
        })
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