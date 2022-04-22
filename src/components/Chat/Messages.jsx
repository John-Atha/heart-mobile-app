import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { useSelector } from 'react-redux'
import { getMessages } from '../../data/chat';
import { selectAuth } from '../../redux/slices/authSlice'

export const Messages = ({ contactId }) => {
    const { user: { id } } = useSelector(selectAuth);

    const messages = getMessages(id, contactId);

    return (
        messages.map((message) => {
            return (
                <OneMessage {...message} />
            )
        })
    )
}

const OneMessage = ({ from, to, text, my_id }) => {
    return (
        <Surface style={from===my_id ? styles.outcoming : styles.incoming}>
            {text}
        </Surface>
    )
}

const styles = StyleSheet.create({
    outcoming: {
        backgroundColor: "blue",
        color: "white",
    },
    incoming: {
        backgroundColor: "lightgrey",
        color: "black",
    }
})