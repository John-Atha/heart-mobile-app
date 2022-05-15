import React, { useEffect, useState } from 'react'
import { Surface, useTheme, Text, IconButton, Button, Menu, TextInput, HelperText, Portal } from 'react-native-paper'
import { View } from 'react-native-web';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { createNoteCall, deleteNoteCall, updateNoteCall } from '../../api/notes';
import { queriesKeys } from '../../api/queriesKeys';
import { selectAuth } from '../../redux/slices/authSlice';
import { setSnackMessage } from '../../redux/slices/snackMessageSlice';
import { ConfirmationDialog } from '../Global/ConfirmationDialog';
import { PersonAvatarWithText } from '../Global/PersonAvatarWithText';

export const OneNote = ({
    id,
    text,
    doctor,
    datetime,
    isCreate=false,
    cancel,
    patient_id,
}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { user: { id: user_id } } = useSelector(selectAuth);
    const [menuOpen, setMenuOpen] = useState(false);
    const [value, setValue] = useState(text);
    const [error, setError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isDeletting, setIsDeletting] = useState(false);

    useEffect(() => {
        setValue(text);
    }, [text])

    const refresh = () => queryClient.invalidateQueries(queriesKeys['getPatientNotes']);

    const cancelAction = () => {
        setIsEdit(false);
        cancel();
    }

    const submit = () => {
        if (!value) {
            setError("Text cannot be empty");
            return;
        }
        if (isCreate) {
            createNoteCall(patient_id, value)
            .then(response => {
                console.log(response.data);
                refresh();
                cancelAction();
            })
            .catch(err => {
                console.log(err.response);
                dispatch(setSnackMessage({
                    text: "Sorry, we could not post your note",
                    severity: "warning",
                }));
            })
        }
        else if (isEdit) {
            updateNoteCall(id, value)
            .then(response => {
                console.log(response.data);
                refresh();
                cancelAction();
            })
            .catch(err => {
                console.log(err);
                dispatch(setSnackMessage({
                    text: "Sorry, we could not update your note",
                    severity: "warning",
                }));
            })
        }
    }

    const onDelete = () => {
        deleteNoteCall(id)
        .then(response => {
            console.log(response.data);
            refresh();
        })
        .catch(err => {
            console.log(err);
            const msg = err.response.status===400
                ? error.response.data
                : "Sorry, we could not delete your note";
            dispatch(setSnackMessage({
                text: msg,
                severity: "error",
            }));
        })
    }

    const preDelete = () => {
        setIsDeletting(true);
    }

    const renderMenu = () => {
        return (
            <Menu
                visible={menuOpen}
                onDismiss={()=>setMenuOpen(false)}
                anchor={
                    <IconButton
                        icon="dots-horizontal"
                        color={theme.colors.primary}
                        size={20}
                        onPress={()=>setMenuOpen(!menuOpen)}
                    />
                }
            >
                <Menu.Item
                    onPress={() => { setIsEdit(true); setMenuOpen(false); }}
                    title="Edit"
                    icon="file-document-edit"
                />
                <Menu.Item
                    title="Delete"
                    icon='delete'
                    onPress={() => {preDelete(); setMenuOpen(false); }}
                    style={{
                        color: theme.colors.primary,
                    }}
                    contentStyle={{
                        color: theme.colors.primary,
                    }}
                />
            </Menu>
        )
    }

    const renderTextOrForm = () => {
        if (isCreate || isEdit) {
            return (
                <View>
                    <TextInput
                        label="Note"
                        value={value}
                        onChangeText={val => setValue(val)}
                        error={!!error}
                        multiline
                        numberOfLines={3}
                    />
                    <HelperText type="error" visible={!!error}>
                        {error}
                    </HelperText>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 8,
                        padding: 8,
                    }}>
                        <Button
                            mode="outlined"
                            onPress={cancelAction}
                        >
                            Cancel
                        </Button>
                        <Button
                            mode="contained"
                            onPress={submit}
                        >
                            Save
                        </Button>
                    </div>
                </View>
            );
        }
        return (
            <Text style={{ marginLeft: 8, marginTop: 4 }}>
                {text}
            </Text>
        )
    }

    const renderConfirmationDialog = () => {
        if (isDeletting) {
            return (
                <Portal>
                    <ConfirmationDialog
                        title={"Are you sure you want to delete this note?"}
                        onClose={()=>setIsDeletting(false)}
                        onAccept={()=> { onDelete(); setIsDeletting(false); }}
                    />
                </Portal>
            )
        }
    }

    return (
        <Surface style={{
            minHeight: 100,
            borderRadius: theme.roundness,
            padding: 8,
            margin: 8,
        }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <PersonAvatarWithText
                    firstName={doctor?.first_name}
                    lastName={doctor?.last_name}
                    subtitle={datetime}
                />
                {user_id==doctor.id && !isCreate &&
                    renderMenu()
                }
            </div>
            { renderTextOrForm() }
            { renderConfirmationDialog() }
        </Surface>
    )
}