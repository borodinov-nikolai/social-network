import { emptySplitApi } from "@/shared/configs/rtkBase";
import { IMessage } from "../interfaces/message";




const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (build)=> ({
        getMessages: build.query<IMessage[], {senderId: number, receiverId?: number}>({
            query: (params)=> ({
                url: '/messages',
                params
            })
        })
    }),
    overrideExisting: false
})


export const {useGetMessagesQuery} = extendedApi