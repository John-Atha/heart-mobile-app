import React from 'react'
import { Headline, Subheading, Surface, useTheme } from 'react-native-paper'

export const SimpleCard = ({
    title,
    subtitle,
}) => {
    const theme = useTheme();
    return (
        <Surface
            style={{
                padding: 4,
                margin: 4,
                height: 100,
                justifyContent: 'center',
                borderRadius: theme.roundness,
                elevation: theme.elevation,
            }}
        >
            <Headline style={{
                textAlign: 'center',
                fontWeight: 'bold',
            }}>
                {title}
            </Headline>
            <Subheading style={{
                textAlign: 'center',
            }}>
                {subtitle}
            </Subheading>
        </Surface>
    )
}