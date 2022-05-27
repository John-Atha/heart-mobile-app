import React, { useEffect } from 'react'
import { Headline } from 'react-native-paper'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { getPatientsCall } from '../../api/doctors'
import { queriesKeys } from '../../api/queriesKeys'
import { selectAuth } from '../../redux/slices/authSlice'
import { clearPatient, selectPatient } from '../../redux/slices/patientSlice'
import { UsersScreen } from '../UsersScreen'
import { PatientCard } from '../../components/Patients/PatientCard'

export const PatientsSplash = ({ navigation: { navigate } }) => {
    const dispatch = useDispatch();
    const { selectedPatient } = useSelector(selectPatient);
    const { user: { id } } = useSelector(selectAuth);

    const { data, isLoading } = useQuery(
        [queriesKeys['getPatients'], id],
        () => getPatientsCall(id), {
            enabled: !!id,
        },
    );

    useEffect(() => {
        return () => dispatch(clearPatient());
    }, [])

    if (selectedPatient) {
        setTimeout(() => {
            navigate("PatientProfile");
        });
    }

    return (
        <UsersScreen
            navigate={navigate}
            data={data}
            isLoading={isLoading}
            noDataMsg={"Sorry, you do not have any patients yet"}
            header={"Find a Patient"}
            oneUserComponent={<PatientCard />}
        />
    )
}