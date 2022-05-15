import React from 'react'
import { Button, Card, DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { genderToStr } from '../../helpers/genderToStr';
import { selectChatContact, setContact } from '../../redux/slices/chatSlice';
import { selectPatient } from '../../redux/slices/patientSlice';
import { MetricsTable } from './MetricsTable';

export const BasicInfo = ({ navigate }) => {
    const dispatch = useDispatch();
    const { selectedPatient } = useSelector(selectPatient);

    const { patient_info } = selectedPatient || {};
    const { age, weight, height, gender } = patient_info || {};

    
    const metrics = [
        {
            name: "age",
            value: age,
        },
        {
            name: "weight(kg)",
            value: weight,
        },
        {
            name: "height(m)",
            value: height,
        },
        {
            name: "gender",
            value: genderToStr(gender),
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
                <MetricsTable metrics={metrics} />
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