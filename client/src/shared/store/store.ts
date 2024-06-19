import { configureStore } from '@reduxjs/toolkit'
import { emptySplitApi } from '../configs/rtkBase'
import { setupListeners } from '@reduxjs/toolkit/query'
import { messageSlice } from '@/entities/message'



export const store = configureStore({
  reducer: {
    message: messageSlice,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
})



setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch