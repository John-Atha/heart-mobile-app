import React, { useEffect, useState } from 'react'
import { Headline, Searchbar, Subheading } from 'react-native-paper'
import { ScrollView } from 'react-native'
import { DoctorCard } from '../components/Doctors/DoctorCard'
import stringSimilarity from "string-similarity"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { clearDoctor, selectDoctor } from '../redux/slices/doctorSlice'
import { DoctorProfile } from '../components/Doctors/DoctorProfile'
import { useQuery } from 'react-query'
import { queriesKeys } from '../api/queriesKeys'
import { getDoctorsCall } from '../api/doctors'
import { Spinner } from '../components/Global/Spinner';

export const DoctorsScreen = ({ navigation: { navigate } }) => {
    const dispatch = useDispatch();
    const { selectedDoctor } = useSelector(selectDoctor);
    
    const { data: doctors, isLoading } = useQuery(
        queriesKeys['doctors'],
        getDoctorsCall, {
            enabled: !Boolean(selectedDoctor)
        }
    )
    const [key, setKey] = useState("");

    useEffect(() => {
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
        if (isLoading) {
            return <Spinner />
        }
        if (!doctors?.length) {
            return (
                <Subheading style={{ marginTop: 20 }}>
                    Sorry, we could not find any doctors
                </Subheading>
            )
        }
        const results = doctors
            .filter(({ first_name: firstName, last_name: lastName }) => isSimilar({ firstName, lastName }))
            .sort(
                ({first_name: first1, last_name: last1 }, { first_name: first2, last_name: last2 }) => (
                    totalSimilarity({firstName: first1, lastName: last1 }) < totalSimilarity({ firstName: first2, lastName: last2 }) ? 1 : -1
                )
            );
        if (results.length) {
            console.log({ results });
            return (
                results.map(({ id, ...props }) => {
                    return (
                        <DoctorCard
                            key={id}
                            id={id}
                            {...props}
                            navigate={navigate}
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

