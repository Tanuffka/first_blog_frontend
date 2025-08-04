import { useMutation } from '@tanstack/react-query';

import { privateApi } from 'src/config/api';

import type { AxiosError, AxiosResponse } from 'axios';

export interface MutationReqData {
  title: string;
  content: string;
}

export function useCreateArticle() {
  const createArticleMutation = useMutation<
    AxiosResponse<{ _id: string }>,
    AxiosError<{ message: string[] }>,
    MutationReqData
  >({
    mutationFn: (data: MutationReqData) => {
      return privateApi.post<{ title: string; content: string; _id: string }>(
        '/api/auth/articles',
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

  const errorMessages = createArticleMutation.isError
    ? createArticleMutation.error.response?.data.message
    : undefined;
  return {
    article: createArticleMutation.data?.data,
    createArticle,
    isPending: createArticleMutation.isPending,
    errorMessages,
  };
}
