import React from 'react'
import { Headline } from 'react-native-paper'
import { Doctor } from '../components/Doctors/Doctor'
import { getDoctors } from '../data/doctors'
import { Layout } from './Layout'

export const DoctorsScreen = () => {

    const doctors = getDoctors();
    console.log(doctors);

    return (
        <Layout>
            <Headline>
                Find a Doctor
            </Headline>
                {doctors?.map(({ id, ...props }) => {
                    return (
                        <Doctor key={id} id={id} {...props} />
                    )
                })}
        </Layout>
    )
}

