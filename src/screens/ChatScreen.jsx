import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { Headline } from 'react-native-paper'
import { Contacts } from '../components/Chat/Contacts'
import { Messages } from '../components/Chat/Messages'
import { getDoctors } from '../data/doctors'
import { users } from '../data/users'
import { Layout } from './Layout'

export const ChatScreen = () => {
    const [contactId, setContactId] = useState(users[10].id);

    const contacts = getDoctors();

    return (
        <Layout>
            <View>
                <Headline>
                    Contacts
                </Headline>
                <Contacts />
            </View>
            <View>
                <Headline>
                    Messages
                </Headline>
                {contactId &&
                    <SafeAreaView>
                        <ScrollView>
                            <Messages contactId={users[10].id} />
                        </ScrollView>
                    </SafeAreaView>
                }
            </View>
        </Layout>
    )
}