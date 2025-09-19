import axios, { type CreateAxiosDefaults } from 'axios';

import { useSession } from 'src/stores/useSession';

import { catchError } from './helpers';

const AXIOS_OPTIONS: CreateAxiosDefaults = {
  // baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const privateApi = axios.create({
  ...AXIOS_OPTIONS,
  withCredentials: true,
});

privateApi.interceptors.request.use(
  async (config) => {
    const { token } = useSession.getState();

    if (!token) {
      return Promise.reject(new Response('Authorization', { status: 401 }));
    }

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

privateApi.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    const { refresh, logout } = useSession.getState();

    if (
      error.config &&
      !error.config._isRetry &&
      (error.response.status === 401 ||
        catchError(error) === 'jwt expired' ||
        catchError(error) === 'jwt must be provided')
    ) {
      originalRequest._isRetry = true;

      try {
        await refresh();

        return privateApi.request(originalRequest);
      } catch (err) {
        console.log(catchError(err as any));

        if (
          catchError(err as any) === 'jwt expired' ||
          catchError(err as any) === 'Refresh token not found' ||
          catchError(err as any) === 'Invalid refresh token'
        ) {
          await logout();
        }
      }
    }

    throw error;
  }
);

export const publicApi = axios.create(AXIOS_OPTIONS);
