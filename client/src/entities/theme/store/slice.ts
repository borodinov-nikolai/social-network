import { createSlice, PayloadAction } from "@reduxjs/toolkit"






const initialState = {
    theme: 'light-theme'
}


const slice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload
            localStorage.setItem('theme', state.theme)
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'dark-theme' ? 'light-theme' : 'dark-theme'
            localStorage.setItem('theme', state.theme)
        }
    }
})

export const { toggleTheme, setTheme } = slice.actions
export const themeSlice = slice.reducer