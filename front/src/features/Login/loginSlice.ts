import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Iuser from '../../models/user';
import { userLogin } from './loginAPI';

export interface logInState {
  accessToken: string;
  logged: boolean;
  error?: string;
}

const initialState: logInState = {
  accessToken: "",
  logged: false,
};

export const loginAsync = createAsyncThunk(
  'login/login',
  async (user: Iuser) => {
    const response = await userLogin(user);
    return response;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = "";
      state.logged = false;
      sessionStorage.removeItem('token')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.accessToken = action.payload?.access;
        state.logged = true;
        sessionStorage.setItem('token',state.accessToken)
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = "Please try again";
      })
  },
});

export const { logout } = loginSlice.actions;

export const selectToken = (state: RootState) => state.login.accessToken;
export const selectRefresh = (state: RootState) => state.login.logged;
export const selectError = (state: RootState) => state.login.error;


export default loginSlice.reducer;
