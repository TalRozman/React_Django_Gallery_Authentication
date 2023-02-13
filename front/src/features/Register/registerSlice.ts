import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState  } from '../../app/store';
import IRegisterUser from '../../models/register';
import { registerUser } from './registerAPI';

export interface registerState {
  error?: string|unknown;
}

const initialState: registerState = {
  
};

export const registerAsync = createAsyncThunk(
  'register/registerUser',
  async (user: IRegisterUser) => {
    const response = await registerUser(user);
    return response;
  }
);

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
  },
});

export const selectRegisterError = (state: RootState) => state.register.error;

export default registerSlice.reducer;
