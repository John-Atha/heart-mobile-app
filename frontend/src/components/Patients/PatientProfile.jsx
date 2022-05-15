import React from 'react'
import { View } from 'react-native'
import { Headline, Subheading } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { selectPatient } from '../../redux/slices/patientSlice'
import { PersonAvatar } from '../Global/PersonAvatar'
import Tabs from '../Global/Tabs'
import { BasicInfo } from './BasicInfo'
import { MetricsAnalytics } from './MetricsAnalytics'
import { MetricsStats } from './MetricsStats'

export const PatientProfile = ({ navigate }) => {
    const { selectedPatient } = useSelector(selectPatient);
    const { id, firstName, lastName } = selectedPatient;

    const tabs = {
        'Info': <BasicInfo navigate={navigate} />,
        'History': (
            <View>
                <MetricsStats />
                <MetricsAnalytics id={id} />
            </View>
        )
    }
    return (
        <>
            <div style={{ display: "flex", alignItems: "center", margin: 5 }}>
                <PersonAvatar
                    firstName={firstName}
                    lastName={lastName}
                />
                <Subheading style={{ marginHorizontal: 5 }}>
                    {lastName} {firstName}
                </Subheading>
            </div>
            <Tabs
                views={tabs}
            />
        </>
    )
}