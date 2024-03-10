import { configureStore } from '@reduxjs/toolkit'
import contentListReducer from '../features/contentListSlice'
export const store = configureStore({
  reducer: {
    content: contentListReducer,
  }
})