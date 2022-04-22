import React from 'react'
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native'
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
                {doctors?.map(({ name, expertise, id }) => {
                    return (
                        <Doctor key={id} name={name} expertise={expertise} />
                    )
                })}
        </Layout>
    )
}

