import React from 'react';
import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useTheme } from 'react-native-paper';
import { View } from 'react-native-web';

export const Pie = ({ data, }) => {
    const theme = useTheme();

    const chartConfig = {
        backgroundGradientFrom: theme.colors.primary,
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    return (
        <View>
            <PieChart
                data={data}
                width={Dimensions.get("window").width-40}
                height={220}
                chartConfig={chartConfig}
                accessor={"value"}
                backgroundColor={"transparent"}
                paddingLeft={8}
                absolute
            />
        </View>
    )
}