import React, { useEffect } from 'react'
import { ScrollView } from 'react-native';
import { Headline } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux'
import { Contacts } from '../components/Chat/Contacts';
import { PersonAvatar } from '../components/Global/PersonAvatar';
import { PatientProfile } from '../components/Patients/PatientProfile';
import { clearPatient, selectPatient } from '../redux/slices/patientSlice'

export const PatientProfileScreen = ({ navigation: { navigate } }) => {
    const dispatch = useDispatch();
    const { selectedPatient } = useSelector(selectPatient);
    const { firstName, lastName, email, username, patient_info } = selectedPatient;

    useEffect(() => {
        return () => dispatch(clearPatient());
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Headline style={{ paddingLeft: 8, margin: 8 }}>
                <PersonAvatar firstName={firstName} lastName={lastName} />
                {firstName} {lastName}
            </Headline>
            <ScrollView style={{ maxHeight: "inherit" }}>
                <PatientProfile navigate={navigate} />
            </ScrollView>
        </SafeAreaView>
    )

}