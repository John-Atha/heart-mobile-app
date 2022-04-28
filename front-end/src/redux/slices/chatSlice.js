import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedContact: null,
}

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setContact: (state, action) => {
            const contact = action.payload;
            state.selectedContact = contact;
        },
        clearContact: (state) => {
            state.selectedContact = null;
        }
    }
})

export const { setContact, clearContact } = chatSlice.actions;
export const selectChatContact = (state) => state.chat;

export default chatSlice.reducer;