import { useQuery } from '@tanstack/react-query';

import { publicApi } from 'src/shared/api';
import type { CommentApiResponseSchema } from 'src/shared/api/schema';

export function useFetchComments(id: string) {
  return useQuery({
    queryKey: ['comments', { id }],
    queryFn: async () => {
      return publicApi
        .get<CommentApiResponseSchema[]>(`/api/articles/${id}/comments`)
        .then((response) => response.data);
    },
    enabled: !!id,
    retry: false,
  });
}
