import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IMessage } from "../interfaces/message"




type InitialState = {
    messages: IMessage[]
    queryData: {senderId: number, receiverId: number} | undefined
}

const initialState: InitialState = {
    messages: [],
    queryData: undefined
}


const slice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setQueryData(state, action: PayloadAction<{senderId: number, receiverId: number} | undefined>) {
          state.queryData = action.payload
        },
        setMessages(state, action: PayloadAction<IMessage[]>){
          state.messages = action.payload
        },
        addMessage(state, action: PayloadAction<IMessage>) {
            state.messages = [...state.messages, action.payload]
        }
    }
})

export const {setMessages, addMessage, setQueryData} = slice.actions
export const messageSlice = slice.reducer