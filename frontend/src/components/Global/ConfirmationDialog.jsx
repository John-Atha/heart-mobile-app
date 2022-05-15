import React from 'react'
import { Button, Dialog, Paragraph, useTheme } from 'react-native-paper';

export const ConfirmationDialog = ({
    title,
    onAccept,
    onClose,
}) => {
    const theme = useTheme();

    if (title) {
        return (
            <Dialog
                visible
                onDismiss={onClose}
            >
                <Dialog.Title>
                    {title}
                </Dialog.Title>
                <Dialog.Content>
                    <Paragraph>
                        This action cannot be reversed
                    </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        mode="text"
                        onPress={onClose}
                        color={theme.colors.text}
                    >
                        Cancel
                    </Button>
                    <Button
                        mode="text"
                        color={theme.colors.primary}
                        onPress={onAccept}
                    >
                        Agree
                    </Button>
                </Dialog.Actions>
            </Dialog>
        )
    }

    return null;
}