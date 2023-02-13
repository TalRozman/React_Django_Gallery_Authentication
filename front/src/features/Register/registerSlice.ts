import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import IRegisterUser from '../../models/register';
import { registerUser } from './registerAPI';

export interface registerState {
  status?:"success"|"failure"|null;
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
    restStatus:(state)=>{
      state.status = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = "success";
        console.log(state.status)
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = "failure";
      })
  },
});

export const { restStatus } = registerSlice.actions;
export const selectStatus = (state: RootState) => state.register.status;

export default registerSlice.reducer;
