import { emptySplitApi } from "@/shared/configs/rtkBase";





const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (build)=>({
        getMe: build.query({
            query: ()=> '/auth/me',
            providesTags: ['User']
        })
    }),
    overrideExisting: false
})


export const {useGetMeQuery} = extendedApi