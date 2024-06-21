import { emptySplitApi } from "@/shared/configs/rtkBase";




const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (build)=> ({
        addContact: build.mutation<null, {contactId: number}>({
            query: (body)=> ({
                url: '/account/add-contact',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Me']
        }),
        getContactMessagesAndCount: build.query<any, number>({
            query: (userId)=> `/contacts/${userId}`
        })
    }),
    overrideExisting: false
})


export const {useAddContactMutation, useGetContactMessagesAndCountQuery} = extendedApi