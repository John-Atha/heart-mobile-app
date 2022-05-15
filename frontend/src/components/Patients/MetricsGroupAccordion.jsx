import moment from 'moment'
import React from 'react'
import { Card, List, Surface, Text, useTheme } from 'react-native-paper'
import { MetricsTable } from './MetricsTable'

export const MetricsGroupAccordion = ({ datetime, metrics }) => {
    return (
        <List.Accordion
            title={moment(datetime).format("DD MMM YY")}
        >
            <MetricsTable
                metrics={metrics}
            />
        </List.Accordion>
    )
}