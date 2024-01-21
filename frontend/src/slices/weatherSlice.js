import { createSlice } from '@reduxjs/toolkit';

// Defines initial state for weatherData slice
const initialState = {
  weatherData: localStorage.getItem('weatherData')
    ? JSON.parse(localStorage.getItem('weatherData'))
    : null,
};

// Create weatherData slice
const weatherSlice = createSlice({
  name: 'weatherData',
  initialState,
  reducers: {
    // Action to set weather data
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
      localStorage.setItem('weatherData', JSON.stringify(action.payload));
    },
  },
});

export const { setWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;
