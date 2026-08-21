import { useQuery } from '@tanstack/react-query';

import { publicApi } from 'src/shared/api';
import type { SearchArticleApiResponseSchema } from 'src/shared/api';
import { SORT_ORDER } from 'src/shared/types/common';

export interface UseSearchArticleParams {
  author?: string;
  limit?: number;
  order?: SORT_ORDER;
  page?: number;
  searchByTitle?: boolean;
  searchKeyword?: string;
  tags?: string[];
}

export type ArticleSearchParams = Pick<
  UseSearchArticleParams,
  'searchKeyword' | 'searchByTitle' | 'tags' | 'author'
>;

export function useSearchArticle(filters: UseSearchArticleParams = {}) {
  const {
    author,
    limit = 10,
    order = SORT_ORDER.desc,
    page = 1,
    searchByTitle = true,
    searchKeyword,
    tags,
  } = filters;

  const queryParams: Record<string, string | number> = {
    limit,
    order,
    page,
  };

  const trimmedSearch = searchKeyword?.trim();
  if (trimmedSearch && searchByTitle) {
    queryParams.title = trimmedSearch;
  }

  if (tags && tags.length > 0) {
    queryParams.tags = tags.join(',');
  }

  const trimmedAuthor = author?.trim();
  if (trimmedAuthor) {
    queryParams.author = trimmedAuthor;
  }

  return useQuery({
    queryKey: ['searchArticles', queryParams],
    queryFn: () =>
      publicApi
        .get<SearchArticleApiResponseSchema>('/api/articles', {
          params: queryParams,
        })
        .then((response) => response.data),
  });
}
