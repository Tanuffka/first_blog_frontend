import axios from 'axios';

import { useSession } from 'src/stores/useSession';

export const privateApi = axios.create();

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

export const publicApi = axios.create();
