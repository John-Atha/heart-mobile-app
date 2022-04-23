import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import chatSlice from './slices/chatSlice'
import snackMessageSlice from './slices/snackMessageSlice'

export const store = configureStore({
  reducer: {
      auth: authSlice,
      snackMessage: snackMessageSlice,
      chat: chatSlice,
  },
})