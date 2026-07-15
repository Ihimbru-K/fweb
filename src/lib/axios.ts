import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/lib/auth-store';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Attach JWT on every request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Silent token refresh + error normalisation on 401
let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        useAuthStore.getState().login(data.token, data.user);
        isRefreshing = false;
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        useAuthStore.getState().logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
