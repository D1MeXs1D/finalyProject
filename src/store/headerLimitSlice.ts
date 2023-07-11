import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type loginAndPassword = {
  valueUsed: number ,
  limitCompany: number
}

const initialState: loginAndPassword = {
  valueUsed : 0,
  limitCompany: 0
}

export const requestForAPI = createSlice({
  name: 'limitResponce',
  initialState,
  reducers: {
    valueUsedState: (state, action: PayloadAction<number>) => {
      state.valueUsed = action.payload;
    },
    limitCompanyState: (state, action: PayloadAction<number>) => {
      state.limitCompany = action.payload;
    },
  },
})

export const {valueUsedState, limitCompanyState} = requestForAPI.actions

export default requestForAPI.reducer