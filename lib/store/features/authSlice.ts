import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user:any | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user:null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    login:(state,action)=>{
        state.accessToken=action.payload.accessToken;
        state.refreshToken=action.payload.refreshToken;
        state.user=action.payload.user;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
    
  

  },
})

// Action creators are generated for each case reducer function
export const {login } = authSlice.actions

export default authSlice.reducer