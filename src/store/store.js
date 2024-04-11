import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import pageApi from '@/store/api/page'
import pageSlice from '@/store/slices/page'

export const reducer = combineReducers({
  [pageApi.reducerPath]: pageApi.reducer,
  [pageSlice.name]: pageSlice.reducer,
})

export const middleware = (getMiddleware) =>
  getMiddleware({ serializableCheck: false }).concat([pageApi.middleware])

export const store = configureStore({ reducer, middleware })
export default store
