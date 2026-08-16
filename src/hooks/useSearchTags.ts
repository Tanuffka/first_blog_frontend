import { useQuery } from '@tanstack/react-query';
import { publicApi } from 'src/shared/api';

export function useSearchTags(name: string) {
  const trimmedTagName = name?.trim() || '';
  return useQuery({
    queryKey: ['tags', trimmedTagName],
    queryFn: () =>
      publicApi
        .get<string[]>('/api/tags', {
          params: trimmedTagName ? { name: trimmedTagName } : undefined,
        })
        .then((response) => response.data),
    enabled: trimmedTagName.length === 0 || trimmedTagName.length >= 3,
  });
}
