import { create } from 'zustand';
import Cookies from 'universal-cookie';

import { privateApi, publicApi } from 'src/shared/api';

const ACCESS_TOKEN = 'access_token';

interface SessionState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  refresh: () => Promise<string | null>;
  logout: () => Promise<void>;
}

export const useSession = create<SessionState>((set, get) => ({
  token: localStorage.getItem(ACCESS_TOKEN) || null,

  get isAuthenticated() {
    return !!get().token;
  },

  set isAuthenticated(isAuthenticated: boolean) {
    set({ isAuthenticated });
  },

  login: (token) => {
    localStorage.setItem(ACCESS_TOKEN, token);

    set({ token, isAuthenticated: !!token });
  },

  refresh: async () => {
    const cookies = new Cookies(null, { path: '/' });
    const refreshToken = cookies.get('refresh_token');

    if (!refreshToken) return null;

    const response = await publicApi.post<{ refresh_token: string }>(
      '/api/auth/refresh'
    );

    return response.data.refresh_token;
  },

  logout: async () => {
    try {
      await privateApi.post('/api/auth/logout');

      localStorage.removeItem(ACCESS_TOKEN);

      set({ token: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout issue');
    }
  },
}));
