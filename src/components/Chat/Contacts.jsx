import React from 'react'
import { SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux'
import { getDoctors } from '../../data/doctors';
import { selectAuth } from '../../redux/slices/authSlice'
import { Dimensions } from 'react-native';

export const Contacts = () => {
    const { user: { id }} = useSelector(selectAuth);
    const width = useWindowDimensions().width;

    const contacts = getDoctors();


    return (
        <SafeAreaView>
            <div style={{ display: "flex", maxWidth: width }}>
                {contacts.map(({ name, id }) => {
                    return (
                        <Contact key={id} name={name} id={id} />
                    )
                })}
            </div>
        </SafeAreaView>
    )
}

const Contact = ({ name, id }) => {
    const theme = useTheme();
    return (
        <button style={{ maxWidth: "70px", padding: "2px", margin: "4px", borderRadius: "10px", backgroundColor: theme.colors.primary, color: "white"}}>
            {name}
        </button>
    )
}

