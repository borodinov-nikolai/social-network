import { createSlice, PayloadAction } from "@reduxjs/toolkit"




type InitialState = {
    messages: {from: number, message: string} []
}

const initialState: InitialState = {
    messages:[]
}


const slice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage(state, action: PayloadAction<{from: number, message: string}>){
          state.messages = [...state.messages, action.payload]
        }
    }
})

export const {setMessage} = slice.actions
export const messageSlice = slice.reducer