import { useQuery } from '@tanstack/react-query';

import { privateApi } from 'src/shared/api';
import { type UserApiResponseSchema } from 'src/shared/api';

export function useFetchMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      return privateApi
        .get<UserApiResponseSchema>('/api/users/me')
        .then((response) => response.data);
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
