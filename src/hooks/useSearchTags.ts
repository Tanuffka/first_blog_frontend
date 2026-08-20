import { useQuery } from '@tanstack/react-query';

import { publicApi } from 'src/shared/api';

interface TagsQueryParams {
  name?: string;
}

export function useSearchTags(name: string) {
  const trimmedTagName = name?.trim();
  const queryParams: TagsQueryParams = {};
  if (trimmedTagName) {
    queryParams.name = trimmedTagName;
  }

  return useQuery({
    enabled: Boolean(name && name.length >= 3),
    queryKey: ['tags', trimmedTagName],
    queryFn: () =>
      publicApi
        .get<string[]>('/api/tags', {
          params: queryParams,
        })
        .then((response) => response.data),
  });
}
