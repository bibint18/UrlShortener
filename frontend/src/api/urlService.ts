import axiosInstance from './axiosInstance';
import {
  type ShortenUrlRequest,
  type ShortenUrlResponse,
  type GetUserUrlsResponse,
  type RedirectUrlResponse,
} from '../types';

export const urlService = {
  shortenUrl: async (data: ShortenUrlRequest): Promise<ShortenUrlResponse> => {
    const response = await axiosInstance.post<ShortenUrlResponse>(
      '/api/urls/shorten',
      data,
    );
    console.log("response shorter",response.data)
    return response.data;
  },

  getUserUrls: async (page:number,limit:number,search:string=''): Promise<GetUserUrlsResponse> => {
    const response =
      await axiosInstance.get<GetUserUrlsResponse>('/api/urls/',{params:{page,limit,search}});
      console.log('user urls',response.data)
    return response.data;
  },

  redirectUrl: async (shortId: string): Promise<RedirectUrlResponse> => {
    try {
      console.log('urlService.redirectUrl: Fetching shortId:', shortId);
      const response = await axiosInstance.get<RedirectUrlResponse>(`/${shortId}`);
      console.log('urlService.redirectUrl: Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('urlService.redirectUrl: Error:', error);
      throw error;
    }
  },
};