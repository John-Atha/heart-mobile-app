import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  logged: false,
  isDoctor: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        state.logged = Boolean(user);
        state.isDoctor = user?.isDoctor;
    },
    logout: (state) => {
        state.user = null;
        state.token = null;
        state.logged = false;
        state.isDoctor = false;
    },
    fill: (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        state.logged = Boolean(user);
        state.isDoctor = user?.isDoctor;
    }
  },
})

export const { login, logout, fill } = authSlice.actions
export const selectAuth = (state) => state.auth;

export default authSlice.reducer