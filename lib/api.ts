import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export const api = axios.create({
  baseURL: '', // Optionally set a base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ApiError {
  code: string;
  message: string;
  details?: any[];
}

export async function apiRequest<T>(
  url: string,
  config: AxiosRequestConfig = {},
  token?: string
): Promise<T> {
  try {
    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...config.headers,
    };
    const response = await api.request<T>({
      url,
      ...config,
      headers,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<any>;
      throw err.response?.data?.error || { code: 'UNKNOWN', message: err.message };
    }
    throw { code: 'UNKNOWN', message: 'Unknown error' };
  }
}