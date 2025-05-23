// import { createApi, fetchBaseQuery } from '@tanstack/react-query';
// import { store } from '../redux/store';
// import { setCredentials } from '../redux/slices/authSlice';
// import { AuthState } from '../types';

// export const baseApi = createApi({
//   reducerPath: 'baseApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_API_URL,
//     prepareHeaders: (headers, { getState }) => {
//       const state = getState() as { auth: AuthState };
//       const token = state.auth.accessToken;
//       if (token) {
//         headers.set('authorization', `Bearer ${token}`);
//       }
//       return headers;
//     }
//   }),
//   endpoints: () => ({}),
//   tagTypes: ['Urls']
// });

// // Token refresh logic (simplified, to be expanded later)
// baseApi.middleware = async (action, { dispatch, getState }) => {
//   if (action.type === 'baseApi/executeQuery/rejected' && action.payload?.status === 401) {
//     const state = getState() as { auth: AuthState };
//     const refreshToken = state.auth.refreshToken;
//     if (refreshToken) {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ refreshToken })
//         });
//         const { accessToken } = await response.json();
//         dispatch(setCredentials({ ...state.auth, accessToken }));
//         // Retry original request (handled by RTK Query)
//       } catch {
//         dispatch(setCredentials({ user: null, accessToken: null, refreshToken: null }));
//       }
//     }
//   }
// };