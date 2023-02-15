import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import IProfile from '../../models/profile';
import { logout } from '../Login/loginSlice';
import { addProfile, delProfile, getProfile, updProfile } from './profileAPI';


export interface profileState {
  profiles:IProfile[]
  refresh:boolean
}

const initialState: profileState = {
  profiles:[],
  refresh:false
};

export const getProfileAsync = createAsyncThunk(
  'profile/getProfile',
  async (obj: { id:number, accessToken: string }) => {
    const response = await getProfile(obj);
    return response;
  }
);
export const addProfileAsync = createAsyncThunk(
  'profile/addProfile',
  async (obj: { pro: IProfile, accessToken: string }) => {
    const response = await addProfile(obj);
    return response;
  }
);
export const updProfileAsync = createAsyncThunk(
  'profile/updProfile',
  async (obj: { pro: IProfile, accessToken: string }) => {
    const response = await updProfile(obj);
    return response;
  }
);
export const delProfileAsync = createAsyncThunk(
  'profile/delProfile',
  async (obj: { id: number, accessToken: string }) => {
    const response = await delProfile(obj);
    return response;
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile:(state)=>
    {
      state.profiles = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.profiles = [action.payload]
      })
      .addCase(updProfileAsync.fulfilled, (state, action) => {
        state.refresh = !state.refresh
      })
      .addCase(addProfileAsync.fulfilled, (state, action) => {
        state.refresh = !state.refresh
      })
      .addCase(delProfileAsync.fulfilled, (state, action) => {
        state.refresh = !state.refresh
        logout()
      })
  }
});

export const { resetProfile } = profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile.profiles;
export const selectProfileRefresh = (state: RootState) => state.profile.refresh;

export default profileSlice.reducer;
