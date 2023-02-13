import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {addImage, delImage, getImage, updImage } from './galleryAPI';
import IGallery from '../../models/gallery';

export interface galleryState {
  gallery: IGallery[];
  refresh:boolean;
  title:string;
  content:string;
  img:File|null;
  id:number;
}

const initialState: galleryState = {
  gallery: [],
  refresh:false,
  content:"",
  title:"",
  img:null,
  id:0,
};

export const getImageAsync = createAsyncThunk(
  'gallery/getImage',
  async (token:string) => {
    const response = await getImage(token);
    return response;
  }
);
export const addImageAsync = createAsyncThunk(
  'gallery/addImage',
  async (img:{pic:IGallery,token:String}) => {
    const response = await addImage(img);
    return response;
  }
);
export const updImageAsync = createAsyncThunk(
  'gallery/updImage',
  async (img:{pic:IGallery,token:String}) => {
    const response = await updImage(img);
    return response;
  }
);
export const delImageAsync = createAsyncThunk(
  'gallery/delImage',
  async (img:{id:number,token:String}) => {
    const response = await delImage(img);
    return response;
  }
);

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    // setImg: (state,action) => {
    //   state.img = action.payload;
    // },
    setTitle: (state,action) => {
      state.title = action.payload;
    },
    setContent: (state,action) => {
      state.content = action.payload;
    },
    setId: (state,action) => {
      state.id = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImageAsync.fulfilled, (state,action:PayloadAction<IGallery[]>) => {
        state.gallery = action.payload;
        if (action.payload.length > 1) state.id = +action.payload?.[0].id
      })
      .addCase(addImageAsync.fulfilled, (state) => {
        state.refresh = !state.refresh;
      })
      .addCase(delImageAsync.fulfilled, (state) => {
        state.refresh = !state.refresh;
      })      
      .addCase(updImageAsync.fulfilled, (state) => {
        state.refresh = !state.refresh;
      })
  },
});

export const { setTitle, setContent } = gallerySlice.actions;

export const selectGallery = (state: RootState) => state.gallery.gallery;
export const selectrefresh = (state: RootState) => state.gallery.refresh;
export const selecttitle = (state: RootState) => state.gallery.title;
export const selectcontent = (state: RootState) => state.gallery.content;
export const selectimg = (state: RootState) => state.gallery.img;
export const selectid = (state: RootState) => state.gallery.id;


export default gallerySlice.reducer;
