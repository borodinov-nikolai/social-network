import { emptySplitApi } from "@/shared/configs/rtkBase";
import { ISignUpDto } from "../interfaces/signUp.dto";
import { ISignInDto } from "../interfaces/signIn.dto";



const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (build)=> ({
        signUp: build.mutation< {jwt: string}, ISignUpDto>({
            query: (data)=> ({
                url: '/auth/sign-up',
                method: 'POST',
                body: {
                    ...data
                }
            })
        }),
        signIn: build.mutation< {jwt: string}, ISignInDto>({
            query: (data)=> ({
                url: '/auth/sign-in',
                method: 'POST',
                body: {
                    ...data
                }
            })
        }),
        signOut: build.mutation<null, void>({
            query: ()=> ({
                url: '/auth/sign-out',
                method: 'POST'
            })
        }),
        googleOauth: build.mutation<{jwt: string}, {code: string}>({
            query: (data)=> ({
                url: '/auth/google',
                method: 'POST',
                body: {
                    ...data
                }
            })
        })
      
    }),
    overrideExisting: false
})



export const {useSignUpMutation, useSignInMutation, useSignOutMutation, useGoogleOauthMutation} = extendedApi