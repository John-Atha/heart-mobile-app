import React, { useEffect, useState } from 'react'
import { Headline, Searchbar, Subheading } from 'react-native-paper'
import { ScrollView, View } from 'react-native'
import { DoctorCard } from '../components/Doctors/DoctorCard'
import { getDoctors } from '../data/doctors'
import { Layout } from './Layout'
import stringSimilarity from "string-similarity"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { clearDoctor, selectDoctor } from '../redux/slices/doctorSlice'
import { DoctorProfile } from '../components/Doctors/DoctorProfile'

export const DoctorsScreen = ({ navigation: { navigate } }) => {
    const dispatch = useDispatch();
    const { selectedDoctor } = useSelector(selectDoctor);
    const [doctors, setDoctors] = useState([]);
    const [key, setKey] = useState("");

    useEffect(() => {
        setDoctors(getDoctors());
        return () => dispatch(clearDoctor());
    }, [])

    const isSimilar = ({ firstName, lastName }) => {
        if (!key) return true;
        return stringSimilarity.compareTwoStrings(key, firstName)>0.2 || stringSimilarity.compareTwoStrings(key, lastName)>0.2
    }

    const totalSimilarity = ({ firstName, lastName }) => {
        if (!key) return 1;
        return stringSimilarity.compareTwoStrings(key, firstName) + stringSimilarity.compareTwoStrings(key, lastName);
    }

    const renderResults = () => {
        const results = doctors
            .filter(({ firstName, lastName }) => isSimilar({ firstName, lastName }))
            .sort(
                ({firstName: first1, lastName: last1 }, { firstName: first2, lastName: last2 }) => (
                    totalSimilarity({firstName: first1, lastName: last1 }) < totalSimilarity({ firstName: first2, lastName: last2 }) ? 1 : -1
                )
            );
        if (results.length) {
            return (
                results.map(({ id, ...props }) => {
                    return (
                        <DoctorCard
                            key={id}
                            id={id}
                            {...props}
                            navigate={navigate}
                            similarity={totalSimilarity({
                                firstName: props.firstName,
                                lastName: props.lastName
                            })}
                        />
                    )
                })
            )
        }
        return (
            <Subheading style={{ marginTop: 20 }}>
                There are not any doctors matching your search
            </Subheading>
        )
    }

    if (selectedDoctor) {
        return (
            <DoctorProfile navigate={navigate} />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Headline style={{ paddingLeft: 8 }}>
                Find a Doctor
            </Headline>
            <Searchbar
                placeholder='Search...'
                onChangeText={(val) => setKey(val)}
                value={key}
                style={{ margin: 4 }}
            />
            <ScrollView style={{ maxHeight: "inherit" }}>
                { renderResults() }
            </ScrollView>
        </SafeAreaView>
    )
}

