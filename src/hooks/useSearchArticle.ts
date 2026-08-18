import { useQuery } from '@tanstack/react-query';

import { publicApi } from 'src/shared/api';
import type { SearchArticleApiResponseSchema } from 'src/shared/api';

export interface FilterApiResponseSchema {
  order?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
  searchKeyword?: string;
  searchByTitle?: boolean;
  tags?: string[];
  author?: string;
}

export type ArticleSearchParams = Pick<
  FilterApiResponseSchema,
  'searchKeyword' | 'searchByTitle' | 'tags' | 'author'
>;

export function useSearchArticle(filters: FilterApiResponseSchema = {}) {
  const {
    order = 'DESC',
    page = 1,
    limit = 10,
    searchKeyword,
    searchByTitle = true,
    tags,
    author,
  } = filters;

  const queryParams: Record<string, string | number> = {
    order,
    page,
    limit,
  };

  const trimmedSearch = searchKeyword?.trim();
  if (trimmedSearch) {
    queryParams[searchByTitle ? 'title' : 'search'] = trimmedSearch;
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
