import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Button, Caption, Dialog, Headline, Portal, Subheading, Surface } from 'react-native-paper'
import { Grid } from 'react-native-paper-grid'
import { View } from 'react-native-web'
import { PersonAvatar } from '../Global/PersonAvatar'
import { DiseaseCard } from './DiseaseCard'

const baseContainer = {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 4,
}

const styles = StyleSheet.create({
    container: {
        ...baseContainer,
    },
    spaceContainer: {
        ...baseContainer,
        justifyContent: "space-between",
    },
    button: {
        margin: 4,
        width: 135,
    }
})

export const DiseaseRow = ({ name, severity, id, pinned, metrics }) => {

    const [showingDisease, setShowingDisease] = useState(false);

    const onOpen = () => setShowingDisease(true);
    const onClose = () => setShowingDisease(null);

    const renderDiseaseDialog = () => {
        if (showingDisease) {
            return (
                <Portal>
                    <Dialog visible onDismiss={onClose}>
                        <DiseaseCard
                            name={name}
                            severity={severity}
                            id={id}
                            pinned={pinned}
                            metrics={metrics}
                        />
                    </Dialog>
                </Portal>
            )
        }
    }

    return (
        <Surface style={{ padding: 4 }}>
            <View style={styles.spaceContainer}>
                <View style={styles.container}>
                    <PersonAvatar
                        firstName={name}
                        lastName={""}
                        styles={{ margin: 4 }}
                    />
                    <View>
                        <Subheading style={{ margin: 0 }}>                    
                            {name}
                        </Subheading>
                        <Caption style={{ margin: 0 }}>
                            Severity: { severity }
                        </Caption>
                    </View>
                </View>
                <View>
                    <Button
                        style={styles.button}
                        icon="information"
                        mode="contained"
                        onPress={onOpen}
                    >
                        Info
                    </Button>
                    <Button
                        style={styles.button}
                        icon={"pin"}
                        mode={pinned ? "outlined" : "contained"}
                    >
                        {pinned ? "Unpin" : "Pin"}
                    </Button>
                </View>
            </View>
            { renderDiseaseDialog() }
        </Surface>
    )
}