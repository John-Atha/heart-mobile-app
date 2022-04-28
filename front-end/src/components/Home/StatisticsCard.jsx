import React from 'react'
import { StyleSheet } from 'react-native'
import { Subheading, Surface } from 'react-native-paper'
import { Line } from '../Charts/LineChart'


export const StatisticsCard = ({ title, data, labels, suffix }) => {
    return (
        <Surface style={styles.surface}>
            <Subheading style={styles.head}>
                {title}
            </Subheading>
            <Line data={data} labels={labels} suffix={suffix} />
        </Surface>
    )
}

const styles = StyleSheet.create({
    head: {
        textAlign: "center",
    },
    surface: {
        padding: "4px",
        margin: "8px",
        elevation: 0,
        backgroundColor: "inherit",
    }
})