import React, { useEffect, useState } from 'react'
import { DoctorCard } from '../../components/Doctors/DoctorCard'
import { useDispatch, useSelector } from 'react-redux'
import { clearDoctor, selectDoctor } from '../../redux/slices/doctorSlice'
import { useQuery } from 'react-query'
import { queriesKeys } from '../../api/queriesKeys'
import { getDoctorsCall } from '../../api/doctors'
import { UsersScreen } from '../UsersScreen'

export const DoctorsSplash = ({ navigation: { navigate } }) => {
    const dispatch = useDispatch();
    const { selectedDoctor } = useSelector(selectDoctor);
    
    const { data: doctors, isLoading } = useQuery(
        queriesKeys['doctors'],
        getDoctorsCall, {
            enabled: !Boolean(selectedDoctor)
        }
    )

    useEffect(() => {
        return () => dispatch(clearDoctor());
    }, [])

    if (selectedDoctor) {
        setTimeout(() => {
            navigate("DoctorProfile");
        });
    }

    return (
        <UsersScreen
            navigate={navigate}
            data={doctors}
            isLoading={isLoading}
            noDataMsg={"Sorry, we could not find any doctors"}
            header={"Find a Doctor"}
            oneUserComponent={<DoctorCard />}
        />
    )
}

