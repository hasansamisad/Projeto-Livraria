import { configureStore } from '@reduxjs/toolkit';
import userPreferencesReducer from './userPreferencesSlice';

export const store = configureStore({
  reducer: {
    preferences: userPreferencesReducer,
  },
});