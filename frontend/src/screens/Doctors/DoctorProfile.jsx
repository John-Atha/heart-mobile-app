import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Divider, Headline, Subheading, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux'
import { setContact } from '../../redux/slices/chatSlice';
import { clearDoctor, selectDoctor } from '../../redux/slices/doctorSlice'
import { PersonAvatar } from '../../components/Global/PersonAvatar';

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        marginTop: 4,
        alignItems: "center"
    },
    scrollable: {
        maxHeight: "inherit",
        paddingHorizontal: 4,
        whiteSpace: "pre-wrap",
        backgroundColor: "inherit",
    },
})

export const DoctorProfile = ({ navigation: { navigate } }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { selectedDoctor: { id, firstName, lastName, username, doctor_info } } = useSelector(selectDoctor);
    
    const { description, expertise } = doctor_info || {};

    console.log({ doctor_info });

    useEffect(() => {
        () => dispatch(clearDoctor());
    }, [])

    const startChat = () => {
        dispatch(setContact({
            firstName,
            lastName,
            username,
            id,
            doctor_info,
        }));
        navigate("Chat");
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background2 }}>
            <View style={{ flex: 1 }}>
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
                    <View style={{ flex: 1, paddingHorizontal: 8, borderRadius: theme.roundness, backgroundColor: theme.colors.background }}>
                        <Subheading style={{ marginTop: 16 }}>
                            Description
                        </Subheading>
                        <Divider />
                        <ScrollView style={styles.scrollable}>
                            <Text>
                                { description }
                            </Text>
                        </ScrollView>
                    </View>
                }
            </View>
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