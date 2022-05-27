import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Checkbox, Headline } from 'react-native-paper'
import { useQuery, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import { getUserLimits, postUserLimits, updateUserLimits } from '../../api/limits'
import { getAllMetrics } from '../../api/metrics'
import { queriesKeys } from '../../api/queriesKeys'
import { setSnackMessage } from '../../redux/slices/snackMessageSlice'
import { Spinner } from '../Global/Spinner'
import { MetricsTable } from '../Patients/MetricsTable'
import { LimitsForm } from './LimitsForm'

export const Limits = ({ patient_id }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery(
        [queriesKeys['getUserLimits'], patient_id],
        () => getUserLimits(patient_id), {
            refetchOnWindowFocus: false,
        }
    );
    const { data: metrics, isLoading: metricsLoading } = useQuery(
        [queriesKeys['getAllMetrics']],
        getAllMetrics, {
            refetchOnWindowFocus: false,
        }
    )
    
    const [groupId, setGroupId] = useState(null);
    const [limits, setLimits] = useState([]);
    const [receiveNotification, setReceiveNotification] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [errors, setErrors] = useState(null);

    const myIsNan = (number) => {
        return isNaN(parseFloat(number));
    }

    const getErrors = ({ metric }) => {
        const limit = limits.find(( { metric: currMetric }) => currMetric===metric);
        const { lower_limit, upper_limit } = limit;
        const OK = {
            error: false,
            helperText: "",
        };
        if (lower_limit==='' && upper_limit==='') {
            return OK;
        }
        if (myIsNan(lower_limit) ||
            myIsNan(upper_limit) ||
            parseFloat(lower_limit)>parseFloat(upper_limit)
        ) {
            return ({
                error: true,
                helperText: "Lower limit must not exceed the upper limit",
            })
        }
        return OK;
    }

    useEffect(() => {
        const temp = {};
        limits.forEach(({ metric }) => {
            temp[metric] = getErrors({ metric });
        });
        setErrors(temp);
    }, [limits])

    useEffect(() => {
        if (data || metrics) {
            setGroupId(data?.id);
            let limits_ = data
                ? data.limits
                    .map(({ metric, upper_limit, lower_limit }) => ({
                        metric: metric.name,
                        upper_limit,
                        lower_limit,
                    }))
                : [];
            
            if (metrics) {
                console.log({ metrics__: metrics, limits_ });
                const existingNames = limits_
                    ? limits_.map(({ metric }) => metric)
                    : [];
                const newLimits = metrics
                    .map(({ name }) => name)
                    .filter((name) => !existingNames.includes(name))
                    .map((name) => ({ metric: name, lower_limit: '', upper_limit: '' }));
                    limits_ = limits_.concat(newLimits);
                console.log({ existingNames, newLimits });
            } 
            console.log({ LIMITSSSS_: limits_ })
            setLimits(limits_);
            setReceiveNotification(!!data?.receive_notification);
        }
    }, [data, metrics])

    const refresh = () => {
        queryClient.invalidateQueries(
            [queriesKeys['getUserLimits'], patient_id]
        );
        setIsEdit(false);
        setIsCreate(false);
    }

    const submit = () => {
        console.log({ limits });
        console.log({ errors });
        const errorsMsgs = Object.values(errors)
            .filter(({ error }) => error)
            .map(({ helperText }) => helperText);
        console.log({ errorsMsgs });
        if (errorsMsgs.length) {
            dispatch(setSnackMessage({
                text: errorsMsgs[0],
                severity: 'warning',
            }));
            return;
        }
        const body = {
            limits: limits.filter(({ upper_limit, lower_limit }) => (!!upper_limit && !!lower_limit)),
            receive_notification: receiveNotification,
        };
        let method = postUserLimits;
        let id = patient_id;
        if (isEdit) {
            method = updateUserLimits;
            id = groupId;
        }
        console.log({ id, body });
        method(id, body)
        .then(response => {
            console.log(response.data);
            dispatch(setSnackMessage({
                text: "Updated successfully",
                severity: "success",
            }));
            refresh();
        })
        .catch(err => {
            console.log(err);
            console.log(err.response);
            let text = "Sorry, we could not update the limits";
            if (err.response?.status===400) {
                if (typeof (err.response.data) === 'string')
                    text = err.response.data;
            }
            dispatch(setSnackMessage({
                text,
                severity: "error",
            }));
        })
    }

    const renderTable = () => {
        if (isError) {
            return (
                <View>
                    <Headline>
                        You have not added the recommended limits for this patient
                    </Headline>
                    {!isCreate &&
                        <Button
                            mode='contained'
                            onPress={()=>setIsCreate(true)}
                            style={{ padding: 4, margin: 16 }}
                        >
                            Add
                        </Button>
                    }
                </View>
            )
        }
        if (isEdit || isCreate) {
            return (
                <LimitsForm
                    limits={limits}
                    setLimits={setLimits}
                    onSubmit={submit}
                    errors={errors}
                />
            )
        }
        return (
            <MetricsTable
                metrics={limits.map(({ metric, lower_limit, upper_limit }) => ({
                    name: metric,
                    value: `${lower_limit}-${upper_limit}`,
                }))}
            />
        )
    }

    if (isLoading) {
        return (
            <Spinner />
        )
    }
    return (
        <View>
            { renderTable() }
            {!isError && 
                <Checkbox.Item
                    disabled={!isCreate && !isEdit}
                    style={{ marginTop: 10 }}
                    status={receiveNotification ? 'checked' : 'unchecked'}
                    onPress={()=>setReceiveNotification(!receiveNotification)}
                    label="Notify me when limits are exceeded"
                    position='leading'
                />
            }
            {!isError && !isCreate && !isEdit &&
                <Button
                    mode='contained'
                    onPress={() => setIsEdit(true)}
                    style={{ padding: 4, margin: 16 }}
                >
                    Edit
                </Button>
            }
            {(isCreate || isEdit) &&
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 4,
                    margin: 16,
                }}>
                    <Button
                        mode='outlined'
                        onPress={refresh}
                        style={{ padding: 4 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        mode='contained'
                        onPress={submit}
                        style={{ padding: 4 }}
                    >
                        Submit
                    </Button>
                </div>
            }
        </View>
    )

}