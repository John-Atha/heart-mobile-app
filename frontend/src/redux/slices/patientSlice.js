import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedPatient: null,
}


export const patientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {
        setPatient: (state, action) => {
            const patient = action.payload;
            state.selectedPatient = patient;
        },
        clearPatient: (state) => {
            state.selectedPatient = null;
        }
    }
})

export const { setPatient, clearPatient } = patientSlice.actions;
export const selectPatient = (state) => state.patient;

export default patientSlice.reducer;