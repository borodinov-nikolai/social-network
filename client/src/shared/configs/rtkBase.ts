import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_API, credentials: 'include' }),
  tagTypes: ['User'],
  endpoints: () => ({}),
  
})