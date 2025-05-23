// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore } from "redux-persist";
// import { persistedReducer } from "./persistConfig";
// import {baseApi} from '../api/'

// export const store = configureStore({
//   reducer:{
//     auth:persistedReducer,
//     [baseApi.reducerPath]: baseApi.reducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST']
//       }
//     }).concat(baseApi.middleware)
// })

// export const persistor = persistStore(store)
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch


import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { persistedReducer } from './persistConfig';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST','persist/REHYDRATE'],
      },
    }),
});

// export const persistor = persistStore(store);
export const persistor = persistStore(store, null, () => {
  console.log('Redux state rehydrated:', store.getState());
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;