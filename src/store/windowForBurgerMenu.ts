import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type stateWindowTypes = {
  value:boolean | undefined;
}

const initialState: stateWindowTypes = {
  value: undefined
}

export const stateWindow = createSlice({
  name: 'stateWindowBurgerMenu',
  initialState,
  reducers: {
    toggleStateWindow: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
})

export const {toggleStateWindow} = stateWindow.actions

export default stateWindow.reducer