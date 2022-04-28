import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Divider, Headline, Subheading } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux'
import { setContact } from '../../redux/slices/chatSlice';
import { selectDoctor } from '../../redux/slices/doctorSlice'
import { PersonAvatar } from '../Global/PersonAvatar';

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        marginTop: 4,
    },
    scrollable: {
        maxHeight: "inherit",
        paddingHorizontal: 4,
        whiteSpace: "pre-wrap",
    },
})

export const DoctorProfile = ({ navigate }) => {
    const dispatch = useDispatch();
    const { selectedDoctor: { id, firstName, lastName, username, expertise, description } } = useSelector(selectDoctor);
    
    const startChat = () => {
        dispatch(setContact({
            firstName,
            lastName,
            username,
            id,
            expertise,
        }));
        navigate("Chat");
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <PersonAvatar
                    firstName={firstName}
                    lastName={lastName}
                    styles={{ margin: 4 }}
                />
                <View>
                    <Headline>                    
                        {lastName} {firstName}
                    </Headline>
                    <Text>
                        { expertise }
                    </Text>
                </View>
            </View>
            {description &&
                <>
                    <Subheading style={{ marginTop: 16 }}>
                        Description
                    </Subheading>
                    <Divider />
                    <ScrollView style={styles.scrollable}>
                        <Text>
                            { description }
                        </Text>
                    </ScrollView>
                </>
            }
            <Button
                style={{ margin: 8 }}
                mode="contained"
                icon="send"
                onPress={startChat}
            >
                Chat with the doctor
            </Button>
        </SafeAreaView>
    )
};