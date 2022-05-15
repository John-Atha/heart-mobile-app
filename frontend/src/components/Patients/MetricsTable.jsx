import React from 'react'
import { DataTable } from 'react-native-paper'

export const MetricsTable = ({ metrics }) => {

    console.log({ metrics });

    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Metric</DataTable.Title>
                <DataTable.Title numeric>Value</DataTable.Title>
            </DataTable.Header>

            {metrics.map(({ metric, name, value }) => {
                return (
                    <DataTable.Row>
                        <DataTable.Cell>{metric?.name || name}</DataTable.Cell>
                        <DataTable.Cell numeric>{ value || "Unknown" }</DataTable.Cell>
                    </DataTable.Row>
                )
            })}
        </DataTable>
    )   
}