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
        })
    }),
    overrideExisting: false
})


export const {useAddContactMutation} = extendedApi