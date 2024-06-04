import { emptySplitApi } from "@/shared/configs/rtkBase";
import { IUser } from "../interfaces/user";





const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (build)=>({
        getMe: build.query<IUser, void>({
            query: ()=> '/auth/me',
            providesTags: ['User']
        })
    }),
    overrideExisting: false
})


export const {useGetMeQuery} = extendedApi