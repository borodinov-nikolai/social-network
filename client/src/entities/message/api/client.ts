import { emptySplitApi } from "@/shared/configs/rtkBase";
import { IMessage } from "../interfaces/message";




const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (build)=> ({
        getMessages: build.query<IMessage[], {senderId: number, receiverId?: number}>({
            query: (params)=> ({
                url: '/messages',
                params
            })
        }),
        getMessagesUnreadCount: build.query<number, number>({
            query: (userId)=> `/messages/unread-count/${userId}` 
        })
    }),
    overrideExisting: false
})


export const {useGetMessagesQuery, useGetMessagesUnreadCountQuery} = extendedApi