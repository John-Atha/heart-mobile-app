import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import chatSlice from './slices/chatSlice'
import doctorSlice from './slices/doctorSlice'
import patientSlice from './slices/patientSlice'
import snackMessageSlice from './slices/snackMessageSlice'

export const store = configureStore({
  reducer: {
      auth: authSlice,
      snackMessage: snackMessageSlice,
      chat: chatSlice,
      doctor: doctorSlice,
      patient: patientSlice,
  },
})