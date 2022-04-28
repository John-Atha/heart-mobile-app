import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, useWindowDimensions } from 'react-native';
import { Surface, TouchableRipple, useTheme } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-paper-grid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-web';
import { useDispatch, useSelector } from 'react-redux'
import { getContacts } from '../../data/contacts';
import { parseDate } from '../../helpers/parseDate';
import { selectAuth } from '../../redux/slices/authSlice'
import { setContact } from '../../redux/slices/chatSlice';
import { PersonAvatar } from '../Global/PersonAvatar';

export const Contacts = () => {
    const { user: { id }} = useSelector(selectAuth);
    const [contacts, setContacts] = useState([]);
    const height = useWindowDimensions().height;

    useEffect(() => {
        setContacts(getContacts());
    }, [])

    return (
        contacts.map(({ id, ...props }) => {
            return (
                <Contact key={id} {...props} id={id} />
            )
        })
    )
}

const Contact = ({ username, firstName, lastName, id, text, seen, datetime }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const styles = StyleSheet.create({
        contact: {
            padding: "2px",
            textAlign: "left",
            elevation: 0,
        }
    })

    const selectDoc = () => {
        console.log("pressing", id);
        dispatch(setContact({ username, firstName, lastName, id }));
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
                            <Text style={{ fontWeight: (seen ? "normal" : "bold") }}>
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
