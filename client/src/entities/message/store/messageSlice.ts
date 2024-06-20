import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IMessage } from "../interfaces/message"




type InitialState = {
    messages: IMessage[]
}

const initialState: InitialState = {
    messages: []
}


const slice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessages(state, action: PayloadAction<IMessage[]>){
          state.messages = action.payload
        },
        addMessage(state, action: PayloadAction<IMessage>) {
            state.messages = [...state.messages, action.payload]
        }
    }
})

export const {setMessages, addMessage} = slice.actions
export const messageSlice = slice.reducer