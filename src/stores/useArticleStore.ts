import { create } from 'zustand';

import { privateApi, publicApi } from 'src/shared/api';
import { type ArticleApiResponseSchema } from 'src/shared/api';

import type { AxiosError } from 'axios';

export interface ArticleRequestData {
  title: string;
  content: string;
}

interface ArticleState {
  articles: ArticleApiResponseSchema[];
  errors: string[] | undefined;
  isLoading: boolean;
  isCreating: boolean;
  fetchAllArticles: () => void;
  createArticle: (data: ArticleRequestData) => Promise<string>;
}

export const useArticleStore = create<ArticleState>((set) => ({
  articles: [],

  errors: undefined,

  isLoading: false,
  isCreating: false,

  fetchAllArticles: () => {
    set({ isLoading: true });

    publicApi
      .get<ArticleApiResponseSchema[]>('/api/articles')
      .then((response) => response.data)
      .then((articles) => set({ articles }))
      .finally(() => set({ isLoading: false }));
  },

  createArticle: async (data) => {
    set({ isCreating: true });

    return privateApi
      .post('/api/articles', data)
      .then((response) => response.data)
      .then((article) => {
        set((state) => ({ articles: [article, ...state.articles] }));
        return article._id;
      })
      .catch((error: AxiosError<{ message: string | string[] }>) => {
        const errorMessages = error.response?.data.message;
        if (Array.isArray(errorMessages)) {
          set({
            errors: errorMessages,
          });
        }
        throw error;
      })
      .finally(() => set({ isCreating: false }));
  },

  // fetchAllArticles: async () => {
  //   set({ isLoading: true });
  //   try {
  //     const response =
  //       await publicApi.get<ArticleApiResponseSchema[]>('/api/articles');
  //     const articles = response.data;

  //     set({ articles });
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     set({ isLoading: false });
  //   }
  // },
}));
