import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import IProfile from '../../models/profile';
import { addProfile, getProfile, updProfile } from './profileAPI';


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
  async (obj: { id:number, token: string }) => {
    const response = await getProfile(obj);
    return response;
  }
);
export const addProfileAsync = createAsyncThunk(
  'profile/addProfile',
  async (obj: { pro: IProfile, token: string }) => {
    const response = await addProfile(obj);
    return response;
  }
);
export const updProfileAsync = createAsyncThunk(
  'profile/updProfile',
  async (obj: { pro: IProfile, token: string }) => {
    const response = await updProfile(obj);
    return response;
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
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
  }
});

// export const {  } = profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile.profiles;
export const selectProfileRefresh = (state: RootState) => state.profile.refresh;

export default profileSlice.reducer;
