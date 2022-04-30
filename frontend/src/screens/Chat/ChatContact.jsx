import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Messages } from '../../components/Chat/Messages'
import { clearContact, selectChatContact } from '../../redux/slices/chatSlice'

export const ChatContact = ({ navigation: { navigate } }) => {
    const dispatch = useDispatch();
    const { selectedContact } = useSelector(selectChatContact);

    useEffect(() => {
        return () => dispatch(clearContact());
    }, [])

    return <Messages contact={selectedContact} navigate={navigate} />;

}