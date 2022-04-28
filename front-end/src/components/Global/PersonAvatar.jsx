import React from 'react'
import { Avatar } from 'react-native-paper'

export const PersonAvatar = ({ firstName="a", lastName="b", size=40, styles }) => (
    <Avatar.Text
        size={size}
        label={lastName?.slice(0, 1)+firstName.slice(0, 1)}
        style={styles}
    />
)