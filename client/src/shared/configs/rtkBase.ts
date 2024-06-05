import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'



const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_API,
  credentials: 'include',
  prepareHeaders: (headers)=> {
    const token = localStorage.getItem('jwt')
    if(token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})


const baseQueryWithReauth: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, endpoints)=> {
        let result = await baseQuery(args, api, endpoints)

        if(result.error && result.error.status === 403) {
          const refreshResult = await baseQuery({url: 'auth/refresh', method: 'POST'}, api, endpoints)
          
          if(refreshResult.data) {
              const {jwt} = refreshResult.data as {jwt: string}
              localStorage.setItem('jwt', jwt)
              
               result = await baseQuery(args, api, endpoints)
          } else {
            localStorage.removeItem('jwt')
            console.log('Выход из аккаунта')
          }
        }


        return result
}


export const emptySplitApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: () => ({}),
  
})