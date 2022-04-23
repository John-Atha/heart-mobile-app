import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Subheading, Surface } from 'react-native-paper'
import { Col, Grid, Row } from 'react-native-paper-grid'
import { PersonAvatar } from '../Global/PersonAvatar'

export const Doctor = ({ firstName, lastName, username, expertise }) => {
    return (
        <Surface style={styles.surface}>
            <View>
                <Grid>
                    <Row>
                        <Col size={20}>
                            <PersonAvatar firstName={firstName} lastName={lastName} size={40} styles={styles.avatar} />
                        </Col>
                        <Col size={80}>
                            <Subheading>{lastName} {firstName}</Subheading>
                            <Text>{expertise}</Text>
                        </Col>
                    </Row>
                </Grid>
            </View>
            <View>
                <Grid>
                    <Row>
                        <Col>
                            <Button mode="contained" icon={"send"}>
                                Chat
                            </Button>
                        </Col>
                    </Row>
                </Grid>
            </View>
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