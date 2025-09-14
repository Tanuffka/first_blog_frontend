import { create } from 'zustand';

import { privateApi, publicApi } from 'src/shared/api';

const ACCESS_TOKEN = 'access_token';

interface SessionState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  refresh: () => Promise<void>;
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
    const response = await publicApi.post<{ access_token: string }>(
      '/api/auth/refresh'
    );

    const token = response.data.access_token;

    get().login(token);
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
