import React from 'react'
import { ScrollView, Text } from 'react-native';
import { Button, Card, DataTable, Surface, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { genderToStr } from '../../helpers/genderToStr';
import { selectChatContact, setContact } from '../../redux/slices/chatSlice';
import { selectPatient } from '../../redux/slices/patientSlice';
import { MetricsTable } from './MetricsTable';

export const BasicInfo = ({ navigate }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
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
        dispatch(setContact(selectedPatient));
        setTimeout(()=> {
            navigate("Chat");
        });
    }
    
    return (
        <ScrollView>
            <Card style={{ margin: 4 }}>
                {/* <Card.Title title="Basic info" /> */}
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
            <Surface style={{
                padding: 8,
                margin: 8,
            }}>
                <Text style={{
                    color: theme.colors.error,
                    fontSize: 17,
                }}>
                    The patient has some metrics exceeding the limits that you have set for him.
                </Text>
            </Surface>
        </ScrollView>
    )



}