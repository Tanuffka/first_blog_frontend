import { useQuery } from '@tanstack/react-query';

import { publicApi } from 'src/shared/api';
import { type ArticleApiResponseSchema } from 'src/shared/api';

export function useFetchArticle(id: string) {
  return useQuery({
    queryKey: ['article', { id }],
    queryFn: async () => {
      return publicApi
        .get<ArticleApiResponseSchema>(`/api/articles/${id}`)
        .then((response) => response.data);
    },
    retry: false,
  });
}
