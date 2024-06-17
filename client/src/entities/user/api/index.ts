import { emptySplitApi } from "@/shared/configs/rtkBase";
import { IUser } from "../interfaces/user";





const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (build)=>({
        getMe: build.query<IUser, void>({
            query: ()=> '/auth/me',
            providesTags: ['Me']
        }),
        updateMe: build.mutation<null, FormData>({
            query: (body)=> ({
                url: '/auth/me',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Me']
        }),
        getAllUsers: build.query<IUser[], void>({
            query: ()=> '/users',
            providesTags: ['User']
        })
    }),
      
    overrideExisting: false
})


export const {useGetMeQuery, useUpdateMeMutation, useGetAllUsersQuery} = extendedApi