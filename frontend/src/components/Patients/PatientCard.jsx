import React from 'react'
import { StyleSheet } from 'react-native';
import { Chip, useTheme } from 'react-native-paper'
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
    danger,
}) => {
    const theme = useTheme();
    const styles = StyleSheet.create({
        chip: {
            borderColor: theme.colors.error,
        },
        chipText: {
            color: theme.colors.error,
            textAlign: 'center',
            // backgroundColor: theme.colors.error,
        }
    })
    const dispatch = useDispatch();

    const goToProfile = () => {
        dispatch(setPatient({
            firstName,
            lastName,
            id,
            username,
            patient_info,
            danger,
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

    const getBadge = () => {
        if (Object.keys(danger || {}).length) {
            const metricsNum = danger['in_danger_metrics']?.length || 0;
            if (metricsNum) {
                return (
                    <Chip mode='outlined'
                        style={styles.chip}
                        textStyle={styles.chipText}
                    >
                        {`${metricsNum} limits\nexceeded`}
                    </Chip>
                )
            }
            return null;
        }
        return null;
    }

    return (
        <UserCard
            contact={{
                firstName,
                lastName,
                username,
                id,
                patient_info,
                danger,
            }}
            badge={getBadge()}
            goToProfile={goToProfile}
            firstName={firstName}
            lastName={lastName}
            subtitle={subtitle()}
            navigate={navigate}
        />
    )
}