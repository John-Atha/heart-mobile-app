import React from 'react'
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { hideSnackMessage, selectSnackMessage } from '../../redux/slices/snackMessageSlice'

export const SnackMessage = () => {
    const dispatch = useDispatch();
    const { text, severity, duration, vertical } = useSelector(selectSnackMessage);

    const close = () => dispatch(hideSnackMessage());

    if (text) {
        return (
            <Snackbar
                visible
                onDismiss={close}
                duration={duration}
                style={styles[severity]}
            >
                { text }
            </Snackbar>
        )
    }
    return null;
}


const basicStyles = {
    color: "black",
    textAlign: "center",
}

const styles = StyleSheet.create({
    info: {
        backgroundColor: "#76eaf5",
        ...basicStyles,
    },
    error: {
        backgroundColor: "#ff8a97",
        ...basicStyles,
    },
    warning: {
        backgroundColor: "#c9c95f",
        ...basicStyles,
    },
    success: {
        backgroundColor: "#83d68c",
        ...basicStyles,
    }
})