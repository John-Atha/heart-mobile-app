import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Button, Chip, Surface, TouchableRipple, useTheme } from 'react-native-paper'
import { Col, Grid, Row } from 'react-native-paper-grid';
import { useDispatch } from 'react-redux';
import { setDoctor } from '../../redux/slices/doctorSlice';

export const LimitsExplanation = ({ details, navigate }) => {
    console.log({ details });
    const dispatch = useDispatch();
    const theme = useTheme();
    const goToProfile = (doctor) => {
        console.log({ doctor });
        dispatch(setDoctor({
            ...doctor,
            firstName: doctor.first_name,
            lastName: doctor.last_name,
        }));
        navigate("Doctors"); 
    }
    
    return (
        details?.map(({ doctor, metrics }) => (
            <Surface style={{ padding: 8, display: 'flex', justifyContent: 'center' }}>
                <Text style={{ fontSize: 17 }}>
                    {metrics.join(", ")} are out of limit according to doctor                
                    <Button
                        mode='text'  
                        uppercase={false}
                        stlye={{ padding: 0 }}
                        onPress={
                            ()=>goToProfile(doctor)
                        }
                    >
                        {doctor.last_name} {doctor.first_name}
                    </Button>
                </Text>

            </Surface>
        ))
    )
}