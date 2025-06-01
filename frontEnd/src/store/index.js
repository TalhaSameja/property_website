import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from './slices/propertySlice';
import authReducer from './slices/authSlice'; // assuming you're using auth

const store = configureStore({
  reducer: {
    property: propertyReducer,
    auth: authReducer,
  },
});

export default store;
