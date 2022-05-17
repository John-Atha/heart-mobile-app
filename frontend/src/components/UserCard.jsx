import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Subheading, Surface, useTheme } from 'react-native-paper'
import { Col, Grid, Row } from 'react-native-paper-grid'
import { useDispatch } from 'react-redux'
import { setContact } from '../redux/slices/chatSlice'
import { PersonAvatar } from './Global/PersonAvatar'

export const UserCard = ({
    contact,
    goToProfile,
    firstName,
    lastName,
    badge,
    subtitle,
    navigate,
}) => {

    const theme = useTheme();

    const styles = StyleSheet.create({
        surface: {
            padding: "4px",
            margin: "8px",
            elevation: theme.elevation,
            borderRadius: theme.roundness,
        },
        avatar: {
            margin: "auto",
        }
    })

    const dispatch = useDispatch();

    const startChat = () => {
        dispatch(setContact(contact));
        navigate("Chat");
    }

    return (
        <Surface style={styles.surface}>
            <View>
                <Grid>
                    <Row>
                        <Col size={15}>
                            <PersonAvatar
                                firstName={firstName}
                                lastName={lastName}
                                size={40}
                                styles={styles.avatar}
                            />
                        </Col>
                        <Col size={50}>
                            <Subheading>{lastName} {firstName}</Subheading>
                            {subtitle &&
                                <Text>{subtitle}</Text>
                            }
                        </Col>
                        <Col size={30}>
                            {badge}
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