import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://weather-search-1.onrender.com/' });

// Create API slice
export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ['User', 'Weather'],

  // Define endpoints
  endpoints: (builder) => ({
    // Login mutation
    login: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: 'POST',
        body: data,
        providesTags: () => [{ type: 'User' }],
      }),
    }),
    // Logout mutation
    logout: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: 'POST',
        providesTags: () => [{ type: 'User' }],
      }),
    }),
    // Register mutation
    register: builder.mutation({
      query: (data) => ({
        url: `/register`,
        method: 'POST',
        body: data,
        providesTags: () => [{ type: 'User' }],
      }),
    }),
    // Update user mutation
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/profile`,
        method: 'PUT',
        body: data,
        providesTags: () => [{ type: 'User' }],
      }),
    }),
    // Get weather data query
    getWeather: builder.query({
      query: (location) => ({
        url: `/search/${location}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useLazyGetWeatherQuery,
} = apiSlice;
