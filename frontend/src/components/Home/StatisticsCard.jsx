import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Subheading, Surface } from 'react-native-paper'
import { Line } from '../Charts/LineChart'


export const StatisticsCard = ({ title, data, labels, suffix }) => {
    let content = (
        <Text style={{ textAlign: "center" }}>
            No records found
        </Text>
    );
    if (data?.length) {
        content = (
            <Line data={data} labels={labels} suffix={suffix} />
        );
    }
    return (
        <Surface style={styles.surface}>
            <Subheading style={styles.head}>
                {title}
            </Subheading>
            {content}
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