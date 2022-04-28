import React, { useState, useRef, useEffect } from 'react'
import { ScrollView, StyleSheet, useWindowDimensions, View, Text } from 'react-native';
import { Button, Headline, Subheading, Surface, TextInput, useTheme, Caption } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux'
import { getMessagesCall, markAllMessagesSeen, sendMessageCall } from '../../api/chat';
import { selectAuth } from '../../redux/slices/authSlice'
import { PersonAvatar } from '../Global/PersonAvatar';
import { Spinner } from '../Global/Spinner';
import { queriesKeys } from '../../api/queriesKeys';
import { parseDate } from '../../helpers/parseDate';

export const Messages = ({ contact }) => {
    const queryClient = useQueryClient();
    const { firstName, lastName, username, id: contactId} = contact;
    const { user: { id: userId } } = useSelector(selectAuth);
    const { data, isLoading } = useQuery(
        [queriesKeys['contactMessages'], contactId],
        () => getMessagesCall(contactId), {
            enabled: Boolean(contactId),
        }
    );
    const [text, setText] = useState("");
    const scrollViewRef = useRef();

    useEffect(() => {
        markAllMessagesSeen()
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const sendMessage = () => {
        console.log({ text });
        if (text?.length) {
            sendMessageCall({ text, receiver: contactId })
            .then(response => {
                console.log(response.data);
                queryClient.invalidateQueries(queriesKeys['contactMessages']);
                setText("");
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

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

    const renderMessages = () => {
        if (isLoading) {
            return (
                <Spinner />
            )
        }
        if (!data?.length) {
            return (
                <Subheading>
                    No messages found with this doctor.
                </Subheading>
            )
        }
        return (
            <ScrollView
                style={{ maxHeight: "inherit", flex: 1}}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}
            >
                {data.map((message) => {
                    return (
                        <OneMessage {...message} userId={userId} />
                    )
                })}
            </ScrollView>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Headline>
                <PersonAvatar firstName={firstName} lastName={lastName} styles={{ margin: 4 }} />
                {lastName} {firstName}
            </Headline>
            { renderMessages() }
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
                    onPress={sendMessage}
                >
                    Send
                </Button>
            </View>
        </SafeAreaView>
    )
}

const OneMessage = ({ sender: { id: from }, receiver: { id: to }, text, userId, datetime, seen }) => {
    const width = useWindowDimensions().width;
    const theme = useTheme();

    const messageStyles = {
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
            <Text>{text}</Text>
            <Caption style={{ textAlign: "inherit" }}>
                {parseDate(datetime)}{(from===userId && seen) ? ` ● Seen` : ""}
            </Caption>
        </Surface>
    )
}

