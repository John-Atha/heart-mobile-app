import moment from 'moment'
import React from 'react'
import { Card, List, Surface, Text, useTheme } from 'react-native-paper'
import { LimitsExplanation } from './LimitsExplanation'
import { MetricsTable } from './MetricsTable'

export const MetricsGroupAccordion = ({ datetime, metrics, danger, navigate }) => {
    const theme = useTheme();
    const {
        in_danger,
        in_danger_metrics,
        details
    } = danger || {}

    console.log({ navigate });
    return (
        <List.Accordion
            title={moment(datetime).format("DD MMM YY")}
            titleStyle={{ ...(in_danger && { color: theme.colors.error })}}
        >
            <MetricsTable
                metrics={metrics}
                in_danger_metrics={in_danger_metrics}
            />
            {details &&
                <LimitsExplanation
                    details={details}
                    navigate={navigate}
                />
            }
        </List.Accordion>
    )
}