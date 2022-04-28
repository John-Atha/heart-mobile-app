import React from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper'

export const Spinner = () => {
    const theme = useTheme();

    return (
        <ActivityIndicator animating color={theme.colors.primary} />
    );
}