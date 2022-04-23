import React, { useState, useRef } from 'react'
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Button, Headline, Surface, TextInput, useTheme } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-paper-grid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from '../../data/chat';
import { selectAuth } from '../../redux/slices/authSlice'
import { clearContact } from '../../redux/slices/chatSlice';
import { PersonAvatar } from '../Global/PersonAvatar';

export const Messages = ({ contact }) => {
    const dispatch = useDispatch();
    const { firstName, lastName, username, id: contactId} = contact;
    const { user: { id: userId } } = useSelector(selectAuth);
    const messages = getMessages(userId, contactId);
    const [text, setText] = useState([]);
    const scrollViewRef = useRef();

    const styles = StyleSheet.create({
        actions: {
            padding: "4px",
            marginBottom: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
        }
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Headline>
                <PersonAvatar firstName={firstName} lastName={lastName} styles={{ margin: 4 }} />
                {lastName} {firstName}
            </Headline>
            <ScrollView
                style={{ maxHeight: "inherit", flex: 1}}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}>
            >
                {messages.map((message) => {
                    console.log(message)
                    return (
                        <OneMessage {...message} userId={userId} />
                    )
                })}
            </ScrollView>
            <View style={styles.actions}>
                <TextInput
                    style={{ flexGrow: 1, marginRight: 4 }}
                    mode="outlined"
                    value={text}
                    placeholder="Type your message here..."
                    onChange={(e) => setText(e.target.value)}
                />
                <Button
                    mode="contained"
                    icon={"send"}
                >
                    Send
                </Button>
            </View>
        </SafeAreaView>
    )
}

const OneMessage = ({ from, to, text, userId }) => {
    console.log({ userId })
    const width = useWindowDimensions().width;
    const theme = useTheme();

    const messageStyles = {
        paddingVertical: "16px",
        padding: "8px",
        margin: "4px",
        borderRadius: "10px",
        maxWidth: (2*width/3) - 8,
        wordWrap: "break-word",
    }
    
    const styles = StyleSheet.create({
        outcoming: {
            backgroundColor: theme.colors.primary,
            color: "white",
            textAlign: "right",
            marginLeft: width/3,
            ...messageStyles,
        },
        incoming: {
            backgroundColor: "lightgrey",
            color: "black",
            ...messageStyles,
        }
    })

    return (
        <Surface style={from===userId ? styles.outcoming : styles.incoming}>
            {text}
        </Surface>
    )
}

