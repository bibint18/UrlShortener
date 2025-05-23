// import {createSlice, type PayloadAction,} from '@reduxjs/toolkit'
// import { type AuthState,type User } from '../../types'

// const initialState :AuthState ={
//   user:null,
//   accessToken:null,
//   refreshToken:null
// }

// const authSlice = createSlice({
//   name:'auth',
//   initialState,
//   reducers: {
//     setCredentials:(state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) =>{
//       state.user=action.payload.user
//       state.accessToken=action.payload.accessToken
//       state.refreshToken=action.payload.refreshToken
//     },
//     clearCredentials:(state) => {
//       state.user=null
//       state.accessToken=null
//       state.refreshToken=null
//     }
//   }
// })

// export const {setCredentials,clearCredentials} = authSlice.actions
// export default authSlice.reducer


import { createSlice,type PayloadAction } from '@reduxjs/toolkit';
import { type AuthState, type User } from '../../types';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, updateAccessToken, clearCredentials } =
  authSlice.actions;
export default authSlice.reducer;