import { emptySplitApi } from "@/shared/configs/rtkBase";
import { IUser } from "../interfaces/user";





const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (build)=>({
        getMe: build.query<IUser, void>({
            query: ()=> '/auth/me',
            providesTags: ['User']
        }),
        updateMe: build.mutation<null, FormData>({
            query: (body)=> ({
                url: '/auth/me',
                method: 'POST',
                body
            }),
            invalidatesTags: ['User']
        })
    }),
      
    overrideExisting: false
})


export const {useGetMeQuery, useUpdateMeMutation} = extendedApi