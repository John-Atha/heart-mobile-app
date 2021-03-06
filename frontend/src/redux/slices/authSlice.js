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
        return checkLoggedCall()
        .then(async (response) => {
            console.log(response);
            const token = await AsyncStorage.getItem("token");
            const user = response.data;
            return {
                token,
                logged: true,
                user,
                isDoctor: user?.is_doctor,
            }
        })
        .catch(err => {
            console.log(err);
            return {
                token: null,
                isDoctor: false,
                logged: false,
                user: null,
            }
        })
    }
)

export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        await AsyncStorage.removeItem("@token");
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
        console.log("filling token...")
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