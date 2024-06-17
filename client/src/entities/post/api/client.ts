import { emptySplitApi } from "@/shared/configs/rtkBase";
import { IPost } from "../interfaces/post";




const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (build)=> ({
        addPost: build.mutation<IPost, FormData>({
            query: (body)=> ({
                url: '/posts',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Post']
        }),
        
    }),
    overrideExisting: false
})

export const {useAddPostMutation} = extendedApi