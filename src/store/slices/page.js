import { createSlice } from '@reduxjs/toolkit'

export const initialState = { data: {} }

export const slice = createSlice({
  name: 'page-data',
  initialState,
  reducers: {
    setOptionsData: (state, { payload }) => {
      state.options = payload
    },
    setModulesData: (state, { payload }) => {
      state.modules = payload
    },
  },
})
export default slice

export const { actions, reducer } = slice
export const { setModulesData, setOptionsData } = actions
