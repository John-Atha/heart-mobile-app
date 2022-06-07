import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native';
import { DataTable, HelperText, TextInput } from 'react-native-paper';
import { useQuery } from 'react-query';
import { getAllMetrics } from '../../api/metrics';
import { queriesKeys } from '../../api/queriesKeys';


const styles = StyleSheet.create({
    textField: {
        width: 65,
        // maxHeight: 50,
        marginBottom: 8,
        padding: 0,
    },
})
export const LimitsForm = ({
    isEdit,
    isCreate,
    limits,
    setLimits,
    errors,
}) => {

    const handleChange = ({ metric, isLower, value }) => {
        const index = limits.findIndex(( { metric: currMetric }) => currMetric===metric);
        const newLimit = {
            ...limits[index],
            ...(isLower
                ? { lower_limit: value }
                : { upper_limit: value }
            ),
        };
        const limitsNew = [...limits];
        limitsNew[index] = newLimit;
        setLimits(limitsNew);
    }

    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Metric</DataTable.Title>
                <DataTable.Title numeric>From</DataTable.Title>
                <DataTable.Title numeric>To</DataTable.Title>
            </DataTable.Header>

            {!!limits?.length && limits.map(({ metric, lower_limit, upper_limit }) => {
                const { error, helperText } = errors[metric] || {};
                console.log({ metric, lower_limit, upper_limit });
                return (
                    <DataTable.Row>
                        {/* <View> */}
                            <DataTable.Cell>
                                {metric}
                            </DataTable.Cell>
                            <DataTable.Cell numeric style={{ alignItems: "center" }}>
                                <TextInput
                                    mode="outlined"
                                    value={lower_limit}
                                    onChangeText={(value) => handleChange({
                                        metric,
                                        isLower: true,
                                        value,
                                    })}
                                    error={error}
                                    style={styles.textField}
                                />
                            </DataTable.Cell>
                            <DataTable.Cell numeric style={{ alignItems: "center" }}>
                                <TextInput
                                    mode="outlined"
                                    value={upper_limit}
                                    onChangeText={(value) => handleChange({
                                        metric,
                                        isLower: false,
                                        value,
                                    })}
                                    error={error}
                                    style={styles.textField}
                                />
                            </DataTable.Cell>
                        {/* </View>
                        <HelperText
                            type='error'
                        >
                            {helperText}
                        </HelperText> */}
                    </DataTable.Row>
                )
            })}
        </DataTable>
    );
}