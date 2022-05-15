import React from 'react'
import { useTheme } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { genderToStr } from '../../helpers/genderToStr';
import { setPatient } from '../../redux/slices/patientSlice';
import { UserCard } from '../UserCard';

export const PatientCard = ({
    id,
    first_name: firstName,
    last_name: lastName,
    username,
    patient_info,
    navigate,
}) => {
    const dispatch = useDispatch();

    const goToProfile = () => {
        dispatch(setPatient({
            firstName,
            lastName,
            id,
            username,
            patient_info,
        }));
    }

    const subtitle = () => {
        if (patient_info) {
            const { gender, age } = patient_info;
            console.log({ gender, age })
            const gender_ = genderToStr(gender)==="Unknown" ? '' : genderToStr(gender);
            if (!gender_) {
                return age
            }
            return `${gender_}, ${age}`
        }
        return'';
    }

    return (
        <UserCard
            contact={{
                firstName,
                lastName,
                username,
                id,
                patient_info,
            }}
            goToProfile={goToProfile}
            firstName={firstName}
            lastName={lastName}
            subtitle={subtitle()}
            navigate={navigate}
        />
    )
}