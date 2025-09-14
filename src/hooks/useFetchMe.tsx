import { useQuery } from '@tanstack/react-query';

import { type AuthorizedUserApiSchema, privateApi } from 'src/shared/api';
import { useSession } from 'src/stores/useSession';

export function useFetchMe() {
  const isAuthenticated = useSession((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      return privateApi
        .get<AuthorizedUserApiSchema>('/api/users/me')
        .then((response) => response.data);
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: isAuthenticated,
  });
}
