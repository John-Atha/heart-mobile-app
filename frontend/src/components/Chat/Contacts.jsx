import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, Headline, Surface, TouchableRipple } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-paper-grid';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux'
import { getMessagesSummaryCall } from '../../api/chat';
import { queriesKeys } from '../../api/queriesKeys';
import { parseDate } from '../../helpers/parseDate';
import { selectAuth } from '../../redux/slices/authSlice';
import { setContact } from '../../redux/slices/chatSlice';
import { PersonAvatar } from '../Global/PersonAvatar';
import { Spinner } from '../Global/Spinner';

export const Contacts = ({ navigate }) => {
    const { user: { id: userId }, isDoctor } = useSelector(selectAuth);

    const { data, isLoading } = useQuery(
        queriesKeys['contacts'],
        getMessagesSummaryCall,
    )

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    if (!data?.length) {
        return (
            <Surface style={{ paddingVertical: 16, paddingHorizontal: 8, marginVertical: 16, marginHorizontal: 8 }}>
                <Text style={{ textAlign: "center" }}>
                    Sorry, your chat history is empty
                </Text>
                {!isDoctor &&
                    <Button mode='text' onPress={()=>navigate("Doctors")}>
                        Find doctors
                    </Button>
                }
            </Surface>

        )
    }

    return (
        data.map((datum) => {
            const { sender, receiver, ...props } = datum;
            let contact = sender;
            const sent = sender?.id===userId;
            console.log({ senderId: sender?.id, userId })
            if (sent) contact = receiver;
            return (
                <Contact key={contact.id} {...props} contact={contact} sent={sent} navigate={navigate} />
            )
        })
    )
}

const Contact = ({ contact, text, seen, datetime, sent, navigate }) => {
    const dispatch = useDispatch();

    const {
        username,
        first_name: firstName,
        last_name: lastName,
        id,
        doctor_info,
        patient_info,
        danger
    } = contact || {};

    console.log({ username, firstName, lastName, id, text, seen, datetime });

    const styles = StyleSheet.create({
        contact: {
            padding: "2px",
            textAlign: "left",
            elevation: 0,
            marginHorizontal: 4,
        }
    })

    const selectDoc = () => {
        console.log("pressing", id);
        dispatch(setContact({ firstName, lastName, doctor_info, patient_info, ...contact }));
        setTimeout(() => {
            navigate("ChatContact")
        }, 200)
    }

    return (
        <TouchableRipple onPress={selectDoc}>
            <Surface
                mode="text"
                style={styles.contact}
            >
                <Grid>
                    <Row>
                        <Col size={20}>
                            <PersonAvatar firstName={firstName} lastName={lastName} />
                        </Col>
                        <Col size={80}>
                            <Text style={{ fontWeight: ((!sent && !seen) ? "bold" : "normal") }}>
                                {lastName} {firstName}
                                <br />
                                { text.slice(0, 15)}{text.length>14 && `...`} &bull; {parseDate(datetime)}
                            </Text>
                        </Col>
                    </Row>
                </Grid>
            </Surface>
        </TouchableRipple>
    )
}
