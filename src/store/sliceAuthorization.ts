import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type loginAndPassword = {
  login: string,
  password: string,
  registred: boolean
}

const initialState: loginAndPassword = {
  login: "",
  password: "",
  registred: false
}

export const requestForAPI = createSlice({
  name: 'request',
  initialState,
  reducers: {
    loginState: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    passwordState: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    registredState: (state, action: PayloadAction<boolean>) => {
      state.registred = action.payload;
    },
  },
})

export const {loginState,  passwordState, registredState} = requestForAPI.actions

export default requestForAPI.reducer