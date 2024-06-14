import { emptySplitApi } from "@/shared/configs/rtkBase";
import { IPost } from "../interfaces/post";




const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (build)=> ({
        getAllPosts: build.query<IPost[], void>({
            query: ()=> '/posts'
        }),
        addPost: build.mutation<IPost, FormData>({
            query: (body)=> ({
                url: '/posts',
                method: 'POST',
                body,
            })
        })
    }),
    overrideExisting: false
})

export const {useAddPostMutation, useGetAllPostsQuery} = extendedApi