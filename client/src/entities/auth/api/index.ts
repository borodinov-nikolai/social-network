import { emptySplitApi } from "@/shared/configs/rtkBase";



const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (build)=> ({
        signUp: build.mutation({
            query: (data)=> ({
                url: '/auth/sign-up',
                method: 'POST',
                body: {
                    ...data
                }
            }),
            invalidatesTags: ['User']
        }),
      
    }),
    overrideExisting: false
})



export const {useSignUpMutation} = extendedApi