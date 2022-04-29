import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    text: "",
    severity: "info",
    duration: 3000,
    vertical: "bottom",
}

export const snackMessageSlice = createSlice({
    name: "snackMessage",
    initialState,
    reducers: {
        setSnackMessage: (state, action) => {
            const { text, severity, duration, vertical } = action.payload;
            state.text = text;
            state.severity = severity || "info";
            state.duration = duration || 3000;
            state.vertical = vertical || "bottom";
        },
        hideSnackMessage: (state) => {
            state.text = "";
        }
    },
});

export const { setSnackMessage, hideSnackMessage } = snackMessageSlice.actions;

export const selectSnackMessage = (state) => state.snackMessage;

export default snackMessageSlice.reducer;