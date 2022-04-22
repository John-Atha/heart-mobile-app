import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { View } from 'react-native-web';

export const Line = ({ data, labels, suffix }) => {
    return (
        <View>
            <LineChart
                data={{
                    labels,
                    datasets: [{ data }]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisSuffix={suffix}
                chartConfig={{
                    backgroundGradientFrom: "##47789e",
                    backgroundGradientTo: "#1769aa",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#1769aa"
                    }
                }}
                bezier
                style={{
                    marginRight: 30,
                    borderRadius: 16,
                    width: "inherit",
                }}
            />
        </View>
    )
}