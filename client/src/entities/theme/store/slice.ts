import { createSlice } from "@reduxjs/toolkit"




const initialState = {
    theme: 'dark-theme'
}


const slice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state)=> {
            state.theme = state.theme === 'dark-theme'? 'light-theme': 'dark-theme'
        }
    }
})

export const {setTheme} = slice.actions
export const themeSlice = slice.reducer