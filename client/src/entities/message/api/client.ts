import { emptySplitApi } from "@/shared/configs/rtkBase";




const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (build)=> ({
        getMessage: build.query<{message: string}, void>({
            query: ()=> ''
        })
    }),
    overrideExisting: false
})


export const {useGetMessageQuery} = extendedApi