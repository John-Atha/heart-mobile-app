import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Subheading, Surface } from 'react-native-paper'
import { Col, Grid, Row } from 'react-native-paper-grid'

export const Doctor = ({ name, expertise }) => {
    return (
        <Surface style={styles.surface}>
            <View>
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