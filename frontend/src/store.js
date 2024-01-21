import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import weatherReducer from './slices/weatherSlice';
import { apiSlice } from './slices/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

// Create store with reducers for handling user authentication and weather data states
const store = configureStore({
  reducer: {
    auth: authReducer,
    weatherData: weatherReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Configure middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
