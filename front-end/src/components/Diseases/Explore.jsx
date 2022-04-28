import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import { Headline, Searchbar, Subheading } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import stringSimilarity from "string-similarity"
import { DiseaseRow } from './DiseaseRow';


export const Explore = ({ diseases, navigate }) => {
    const [key, setKey] = useState("");

    const isSimilar = ({ name }) => {
        if (!key) return true;
        return stringSimilarity.compareTwoStrings(key, name)>0.2;
    }

    const renderResults = () => {
        const results = diseases
            .filter(({ name }) => isSimilar({ name }))
            .sort(
                ({name: name1 }, { name: name2 }) => (
                    stringSimilarity.compareTwoStrings(key, name1) < stringSimilarity.compareTwoStrings(key, name2) ? 1 : -1
                )
            );
        if (results.length) {
            return (
                results.map(({ id, ...props }) => {
                    return (
                        <DiseaseRow
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
                There are not any diseases matching your search
            </Subheading>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Searchbar
                placeholder="Search a disease"
                value={key}
                onChangeText={(text) => setKey(text)}
                style={{ margin: 4, marginBottom: 8 }}
            />
            <ScrollView style={{ maxHeight: "inherit", marginBottom: 4, }}>
                { renderResults() }
            </ScrollView>
        </SafeAreaView>
    )
}