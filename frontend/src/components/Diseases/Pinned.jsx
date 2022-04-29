import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { DiseaseCard } from './DiseaseCard'

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        marginVertical: 4,
        justifyContent: "Center"
    }
})


export const Pinned = ({ diseases }) => {
    let content = (
            <Text>
                You have not pinned any diseases yet.
            </Text>
    )
    
    if (diseases?.length) {
        content = (
            diseases.map((disease) => (
                <View style={{ margin: 4, width: "95%" }}>
                    <DiseaseCard {...disease} />
                </View>
            ))
        )
    }

    return (
        <ScrollView style={{ maxHeight: "inherit" }}>
            <View style={styles.container}>
                { content }
            </View>
        </ScrollView>
    )
}