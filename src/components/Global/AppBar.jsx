import React from 'react'
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper'

export const AppBar = ({ navigate }) => {
    const actions = [
        {
            key: 1,
            icon: "mail",
            to: "",
            text: "Messages",
        }
    ]
    
    return (
        <Appbar styles={styles.bottom}>
            {actions.map(({ icon, to, text, key }) => (
                <Appbar.Action
                    icon={icon}
                    to={to}
                    key={key}
                />
            ))}
        </Appbar>
    )
}

const styles = StyleSheet.create({
    bottom: {
      position: 'fixed',
      bottom: 0,
    },
});