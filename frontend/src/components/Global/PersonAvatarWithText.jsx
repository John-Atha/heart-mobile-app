import moment from 'moment'
import React from 'react'
import { Text, View } from 'react-native'
import { Caption } from 'react-native-paper'
import { PersonAvatar } from './PersonAvatar'

export const PersonAvatarWithText = ({
    firstName="a",
    lastName="b",
    size=40,
    styles,
    avatarStyles,
    subtitle,
}) => (
    <div style={{
        display: "flex",
        margin: 8,
        alignItems: "center",
        ...styles,
    }}>
        <PersonAvatar
            firstName={firstName}
            lastName={lastName}
            size={size}
            styles={avatarStyles}
        />
        <View style={{ paddingLeft: 8 }}>
            <Text>
                {lastName} {firstName}
            </Text>
            <Caption>
                {moment(subtitle).format("DD MMM YYYY")}
            </Caption>
        </View>
    </div>
)