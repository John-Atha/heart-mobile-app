import React from 'react'
import { StyleSheet } from 'react-native';
import { DataTable, useTheme } from 'react-native-paper'

export const MetricsTable = ({ metrics, in_danger_metrics }) => {
    const theme = useTheme();

    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Metric</DataTable.Title>
                <DataTable.Title numeric>Value</DataTable.Title>
            </DataTable.Header>

            {metrics.map(({ metric, name, value }) => {
                const name_ = metric?.name || name;
                const in_danger = in_danger_metrics?.includes(name_);
                return (
                    <DataTable.Row>
                        <DataTable.Cell
                            textStyle={{
                                ...(in_danger && { color: theme.colors.error } )
                            }}
                        >
                            {metric?.name || name}
                        </DataTable.Cell>
                        <DataTable.Cell
                            textStyle={{
                                ...(in_danger && { color: theme.colors.error } )
                            }}
                            numeric
                        >
                            { value || "Unknown" }
                        </DataTable.Cell>
                    </DataTable.Row>
                )
            })}
        </DataTable>
    )   
}