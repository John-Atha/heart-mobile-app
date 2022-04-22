import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { checkLoggedCall } from '../../api/auth';
import { users } from '../../data/users';

const initialState = {
  user: null,
  token: null,
  logged: false,
  isDoctor: false,
  status: "idle",
}

export const checkLogged = createAsyncThunk(
    "user/logged",
    async () => {
        const logged = await checkLoggedCall();
        if (logged) {
            const token = await AsyncStorage.getItem("token");
            return {
                token,
                logged,
                user: users[9],
                isDoctor: users[9]?.isDoctor,
            }
        }
        return {
            token: null,
            isDoctor: false,
            logged: false,
            user: null,
        }
    }
)

export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        await AsyncStorage.removeItem("token");
    }
)

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
    fill: (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        state.logged = Boolean(user);
        state.isDoctor = user?.isDoctor;
        AsyncStorage.setItem("token", token);
    },
  },
  extraReducers: (builder) => {
      builder
        .addCase(checkLogged.pending, (state) => {
            state.status = "loading";
        })
        .addCase(checkLogged.fulfilled, (state, action) => {
            const { token, logged, user, isDoctor } = action.payload;
            state.token = token;
            state.logged = logged;
            state.user = user;
            state.isDoctor = isDoctor;
        })
        .addCase(logout.pending, (state) => {
            state.status = "loading";
        })
        .addCase(logout.fulfilled, (state) => {
            state.token = null;
            state.logged = false;
            state.user = null;
            state.isDoctor = false;
        })
  }
})

export const { login, fill } = authSlice.actions
export const selectAuth = (state) => state.auth;

export default authSlice.reducer