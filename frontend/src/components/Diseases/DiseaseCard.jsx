import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card, Chip, DataTable, useTheme } from 'react-native-paper'

export const DiseaseCard = ({ name, metrics, id, severity, pinned }) => {
    const theme = useTheme();
    return (
        <Card style={{ elevation: theme.elevation }}>
            <Card.Title title={name} subtitle={"Severity:"+ severity} />
            <Card.Content>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Metric</DataTable.Title>
                        <DataTable.Title numeric>Limits</DataTable.Title>
                    </DataTable.Header>

                    {metrics.map(({ name, minValue, maxValue }) => {
                        return (
                            <DataTable.Row>
                                <DataTable.Cell>{name}</DataTable.Cell>
                                <DataTable.Cell numeric>{minValue}-{maxValue}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}
                </DataTable>
                <Button
                    style={{ marginTop: 8 }}
                    icon={"pin"}
                    mode={pinned ? "outlined" : "contained"}
                >
                    {pinned ? "Unpin" : "Pin"}
                </Button>
            </Card.Content>
        </Card>
    )
}