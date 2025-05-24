import axiosInstance from './axiosInstance';
import {
  type RegisterRequest,
  type RegisterResponse,
  type VerifyOtpRequest,
  type VerifyOtpResponse,
  type LoginRequest,
  type LoginResponse,
  type RefreshRequest,
  type RefreshResponse,
  type LogoutResponse,
  type ResendResponse,
} from '../types';

export const authService = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await axiosInstance.post<RegisterResponse>(
      '/api/auth/register',
      data,
    );
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    const response = await axiosInstance.post<VerifyOtpResponse>(
      '/api/auth/verifyOtp',
      data,
    );
    return response.data;
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/api/auth/login', data);
    console.log('response on login',response.data)
    return response.data;
  },

  refresh: async (data: RefreshRequest): Promise<RefreshResponse> => {
    const response = await axiosInstance.post<RefreshResponse>(
      '/api/auth/refresh',
      data,
    );
    return response.data;
  },

  logout: async (): Promise<LogoutResponse> => {
    const response = await axiosInstance.post<LogoutResponse>('/api/auth/logout');
    return response.data;
  },

  resend: async (data:string):Promise<ResendResponse> => {
    const response = await axiosInstance.post<ResendResponse>('/api/auth/resend',{data})
    return response.data
  }
};