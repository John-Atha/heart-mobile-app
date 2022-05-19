import React from 'react'
import { Surface, Text, useTheme } from 'react-native-paper'

export const OneQuote = ({ text }) => {
    const theme = useTheme();

    return (
        <Surface style={{
            marginHorizontal: 25,
            padding: 10,
            borderRadius: theme.roundness,
            minHeight: 70,
        }}>
            <Text style={{
                margin: "auto",
                fontSize: theme.defaultFontSize,
                textAlign: "center",
                fontStyle: "italic",
            }}>
                "{text}"
            </Text>
        </Surface>
    )
}