import { AxiosError } from 'axios';
import { type ApiErrorResponse } from '../types';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError && error.response?.data) {
    const apiError = error.response.data as ApiErrorResponse;
    return apiError.message || 'An error occurred';
  }
  return 'An unexpected error occurred';
};