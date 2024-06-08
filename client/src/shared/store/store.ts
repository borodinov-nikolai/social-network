import { configureStore } from '@reduxjs/toolkit'
import { emptySplitApi } from '../configs/rtkBase'
import { setupListeners } from '@reduxjs/toolkit/query'
import { themeSlice } from '@/entities/theme'


export const store = configureStore({
  reducer: {
    theme: themeSlice,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
})



setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch