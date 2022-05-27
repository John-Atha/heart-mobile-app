import React from 'react'
import { StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { setDoctor } from '../../redux/slices/doctorSlice'
import { UserCard } from '../UserCard'

export const DoctorCard = ({
    id,
    first_name: firstName,
    last_name: lastName,
    username,
    doctor_info,
    navigate,
}) => {
    const dispatch = useDispatch();

    const goToProfile = () => {
        dispatch(setDoctor({
            firstName,
            lastName,
            id,
            username,
            doctor_info,
        }));
    }

    return (
        <UserCard
            contact={{
                firstName,
                lastName,
                username,
                id,
                doctor_info,
            }}
            goToProfile={goToProfile}
            firstName={firstName}
            lastName={lastName}
            subtitle={doctor_info?.expertise}
            navigate={navigate}
        />
    )
}