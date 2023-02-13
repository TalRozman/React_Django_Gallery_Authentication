import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gallerySlice from '../features/gallery/gallerySlice';
import loginSlice from '../features/Login/loginSlice';
import registerSlice from '../features/Register/registerSlice';


export const store = configureStore({
  reducer: {
    gallery: gallerySlice,
    login:loginSlice,
    register:registerSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
