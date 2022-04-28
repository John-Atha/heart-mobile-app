import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Explore } from '../components/Diseases/Explore';
import { Pinned } from '../components/Diseases/Pinned';
import { getDiseases } from '../data/diseases';

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 4,
    },
    button: {
        margin: 8,
    }
})

export const DiseasesScreen = ({ navigation: { navigate } }) => {
    const [page, setPage] = useState("pinned");
    const [diseases, setDiseases] = useState([]);
    const [pinned, setPinned] = useState([]);

    useEffect(() => {
        setDiseases(getDiseases());
        setPinned(getDiseases().slice(0, 10));
    }, [])

    let content = <Explore diseases={diseases} navigate={navigate} />

    if (page==="pinned") {
        content = <Pinned diseases={diseases} />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Button
                    onPress={()=>setPage("pinned")}
                    style={styles.button}
                    mode={page==="pinned" ? "contained" : "outlined"}
                >
                    Pinned
                </Button>
                <Button
                    onPress={()=>setPage("explore")}
                    style={styles.button}
                    mode={page==="explore" ? "contained" : "outlined"}
                >
                    Explore
                </Button>
            </View>
            { content }
        </SafeAreaView>
    )
}