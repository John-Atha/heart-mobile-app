import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Subheading, Surface } from 'react-native-paper'
import { Col, Grid, Row } from 'react-native-paper-grid'
import { useDispatch } from 'react-redux'
import { setContact } from '../../redux/slices/chatSlice'
import { setDoctor } from '../../redux/slices/doctorSlice'
import { PersonAvatar } from '../Global/PersonAvatar'

export const DoctorCard = ({ id, firstName, lastName, username, expertise, navigate, similarity, description }) => {
    const dispatch = useDispatch();

    const startChat = () => {
        dispatch(setContact({
            firstName,
            lastName,
            username,
            id,
        }));
        navigate("Chat");
    }

    const goToProfile = () => {
        dispatch(setDoctor({
            firstName,
            lastName,
            id,
            username,
            expertise,
            description,
        }))
    }

    return (
        <Surface style={styles.surface}>
            <View>
                <Grid>
                    <Row>
                        <Col size={20}>
                            <PersonAvatar firstName={firstName} lastName={lastName} size={40} styles={styles.avatar} />
                        </Col>
                        <Col size={80}>
                            <Subheading>{lastName} {firstName} ({similarity}) </Subheading>
                            <Text>{expertise}</Text>
                        </Col>
                    </Row>
                </Grid>
            </View>
            <View>
                <Grid>
                    <Row>
                        <Col>
                            <Button
                                mode="contained"
                                icon={"send"}
                                onPress={startChat}
                            >
                                Chat
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                mode="outlined"
                                icon={"account"}
                                onPress={goToProfile}
                            >
                                Profile
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