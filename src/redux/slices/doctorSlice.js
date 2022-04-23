import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedDoctor: null,
}


export const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        setDoctor: (state, action) => {
            const doctor = action.payload;
            state.selectedDoctor = doctor;
        },
        clearDoctor: (state) => {
            state.selectedDoctor = null;
        }
    }
})

export const { setDoctor, clearDoctor } = doctorSlice.actions;
export const selectDoctor = (state) => state.doctor;

export default doctorSlice.reducer;