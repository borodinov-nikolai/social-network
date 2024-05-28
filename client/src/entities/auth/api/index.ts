import { emptySplitApi } from "@/shared/configs/rtkBase";
import { ISignUpDto } from "../interfaces/signUp.dto";



const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (build)=> ({
        signUp: build.mutation< {jwt: string}, ISignUpDto>({
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