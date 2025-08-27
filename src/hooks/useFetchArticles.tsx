import { useQuery } from '@tanstack/react-query';

import { publicApi } from 'src/shared/api';
import { type ArticleApiResponseSchema } from 'src/shared/api';

// interface FetchArticleState {
//   articles: ArticleApiResponseSchema[];
//   errors: string[] | undefined;
//   isLoading: boolean;
//   isCreating: boolean;
// }

export function useFetchArtcles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: () =>
      publicApi
        .get<ArticleApiResponseSchema[]>('/api/articles')
        .then((response) => response.data),
  });
}
