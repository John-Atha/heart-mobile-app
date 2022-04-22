import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Avatar, Subheading, Surface } from 'react-native-paper'
import { Col, Grid, Row } from 'react-native-paper-grid'

export const Doctor = ({ name, expertise }) => {
    return (
        <Surface style={styles.surface}>
            <Grid>
                <Row>
                    <Col size={20}>
                        <Avatar.Text size={40} label={name?.slice(0, 1)} style={styles.avatar} />
                    </Col>
                    <Col size={80}>
                        <Subheading>{name}</Subheading>
                        <Text>{expertise}</Text>
                    </Col>
                </Row>
            </Grid>
        </Surface>
    )
}

const styles = StyleSheet.create({
    surface: {
        padding: "4px",
        margin: "8px",
        elevation: 3,
    },
    avatar: {
        margin: "auto",
    }
})