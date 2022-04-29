import React from 'react'
import { Button, Card, DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectChatContact, setContact } from '../../redux/slices/chatSlice';
import { selectPatient } from '../../redux/slices/patientSlice';

export const BasicInfo = ({ navigate }) => {
    const dispatch = useDispatch();
    const { selectedPatient } = useSelector(selectPatient);

    const { patientInfo } = selectedPatient || {};
    const { age, weight, height, gender } = patientInfo || {};

    const metrics = [
        {
            name: "age",
            value: age,
        },
        {
            name: "weight",
            value: weight,
        },
        {
            name: "height",
            value: height,
        },
        {
            name: "gender",
            value: gender<2 ? gender : "Unknown",
        }
    ]

    const chat = () => {
        navigate("Chat");
        dispatch(setContact(selectedPatient));
        navigate("Chat");
    }
    
    return (
        <Card style={{ margin: 4 }}>
            <Card.Title title="Basic info" />
            <Card.Content>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Metric</DataTable.Title>
                        <DataTable.Title numeric>Value</DataTable.Title>
                    </DataTable.Header>

                    {metrics.map(({ name, value }) => {
                        return (
                            <DataTable.Row>
                                <DataTable.Cell>{name}</DataTable.Cell>
                                <DataTable.Cell numeric>{ value || "Unknown" }</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}
                </DataTable>
                <Button
                    style={{ marginTop: 8 }}
                    icon={"send"}
                    mode={"contained"}
                    onPress={chat}
                >
                    Chat with patient
                </Button>
            </Card.Content>
        </Card>
    )



}