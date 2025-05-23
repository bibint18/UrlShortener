import axios, { type AxiosInstance, AxiosError } from 'axios';
import { store } from '../redux/store';
import { setCredentials, clearCredentials } from '../redux/slices/authSlice';
import { type RefreshRequest, type RefreshResponse } from '../types';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add access token
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const state = store.getState();
      const refreshToken = state.auth.refreshToken;
      console.log("refreshToken from axiosInstace",refreshToken)
      if (refreshToken) {
        try {
          const response = await axiosInstance.post<RefreshResponse>(
            `/api/auth/refresh`,
            { refreshToken } as RefreshRequest,
          );
          console.log("response after refresh",response.data)
          const { accessToken } = response.data.data;
          if(state.auth.user && state.auth.refreshToken){
            store.dispatch(
            setCredentials({
              user:state.auth.user,
              accessToken,
              refreshToken:state.auth.refreshToken
            }),
          );
          }
          
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          store.dispatch(clearCredentials());
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;