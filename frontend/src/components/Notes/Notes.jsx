import moment from 'moment';
import React, { useRef, useState } from 'react'
import { Text, StyleSheet } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import { ScrollView, View } from 'react-native-web';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { getNotesCall } from '../../api/notes';
import { queriesKeys } from '../../api/queriesKeys';
import { selectAuth } from '../../redux/slices/authSlice';
import { Spinner } from '../Global/Spinner';
import { OneNote } from './OneNote';

export const Notes = ({ id }) => {
    const theme = useTheme();
    const [isCreating, setIsCreating] = useState(false);
    const { user } = useSelector(selectAuth);
    const formRef = useRef();
    
    const styles = StyleSheet.create({
        fab: {
            position: "sticky",
            margin: 16,
            bottom: 0,
            left: "100%",
            width: "min-content",
            backgroundColor: theme.colors.primary,
        },
    })

    const { data, isLoading, isError } = useQuery(
        [queriesKeys['getPatientNotes'], id],
        () => getNotesCall(id), {
            enabled: !! id,
        }
    );

    const openCreateForm = () => {
        setIsCreating(true);
        formRef.current.scrollIntoView({ behavior: "smooth" });    
    }

    if (isLoading) {
        return <Spinner />;
    }

    let content = null;
    if (!isCreating && (!data.length || isError)) {
        content = (
            <Text style={{
                textAlign: "center",
                margin: 8,
                marginTop: 24,
            }}>
                No notes found for this patient
            </Text>
        );
    }
    else {
        content = (
            data.map((note) => (
                <OneNote
                    key={note.id}
                    {...note}
                    cancel={()=>setIsCreating(false)}
                />
            ))
        )
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <div ref={formRef} />
                    {isCreating &&
                        <OneNote
                            key={0}
                            doctor={user}
                            datetime={moment()}
                            text=""
                            isCreate
                            cancel={()=>setIsCreating(false)}
                            patient_id={id}
                        />
                    }
                    { content }
                </ScrollView>
            </View>
            {!isCreating &&
                <FAB
                    style={ styles.fab }
                    icon='plus'
                    onPress={openCreateForm}
                />
            }
        </>
    )
}