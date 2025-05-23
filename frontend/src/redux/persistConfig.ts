import {persistReducer} from "redux-persist"
import storage from 'redux-persist/lib/storage'
import authReducer from './slices/authSlice'
import { combineReducers } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  auth:authReducer
})
const persistConfig = {
  key:'root',
  storage,
  whitelist:['auth'],
}

export const persistedReducer = persistReducer(persistConfig,rootReducer)