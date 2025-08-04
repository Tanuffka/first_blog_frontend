import { useMutation } from '@tanstack/react-query';

import { privateApi } from 'src/config/api';

export interface MutationReqData {
  title: string;
  content: string;
}

export function useCreateArticle() {
  const createArticleMutation = useMutation({
    mutationFn: (data: MutationReqData) => {
      return privateApi.post<{ title: string; content: string }>(
        '/api/articles',
        data
      );
    },
    onSuccess({ data }) {
      console.log(data);
    },
  });

  const createArticle = (data: MutationReqData) => {
    createArticleMutation.mutate(data);
  };

  const errorMessage = createArticleMutation.isError
    ? createArticleMutation.error.message
    : undefined;

  return {
    article: createArticleMutation.data?.data,
    createArticle,
    isPending: createArticleMutation.isPending,
    errorMessage,
  };
}
