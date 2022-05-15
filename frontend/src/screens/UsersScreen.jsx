import React, { cloneElement, useEffect, useState } from 'react'
import { Headline, Searchbar, Subheading, useTheme } from 'react-native-paper'
import { ScrollView } from 'react-native'
import stringSimilarity from "string-similarity"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Spinner } from '../components/Global/Spinner'

export const UsersScreen = ({
    navigate,
    data,
    isLoading,
    noDataMsg,
    header,
    oneUserComponent,
}) => {
    const theme = useTheme();

    const [key, setKey] = useState("");

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
        if (!data?.length) {
            return (
                <Subheading style={{ marginTop: 20 }}>
                    {noDataMsg}
                </Subheading>
            )
        }
        const results = data
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
                        cloneElement(oneUserComponent, {
                            key: id,
                            id,
                            navigate,
                            ...props,
                        })
                    )
                })
            )
        }
        return (
            <Subheading style={{ marginTop: 20 }}>
                There are not any users matching your search
            </Subheading>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background2 }}>
            <Headline style={{ paddingLeft: 8 }}>
                {header}
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

