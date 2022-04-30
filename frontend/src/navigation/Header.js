import React from 'react'
import { Image, Text } from 'react-native'
import { Headline, Subheading } from 'react-native-paper'

export const LogoTitle = ({ children }) => {
    return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={require('../screens/logo_heart.png')}
                />
                <Text>{children}</Text>
            </div>

    )
}