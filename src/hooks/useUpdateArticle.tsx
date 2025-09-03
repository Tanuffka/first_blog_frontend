import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { type ArticleApiResponseSchema, privateApi } from 'src/shared/api';

import type { AxiosError, AxiosResponse } from 'axios';

export interface MutationReqData {
  title: string;
  content: string;
}

export function useUpdateArticle(id: string) {
  const navigate = useNavigate();

  const updateArticleMutation = useMutation<
    AxiosResponse<ArticleApiResponseSchema>,
    AxiosError<{ message: string[] }>,
    MutationReqData
  >({
    mutationFn: (data) => {
      return privateApi.put(`/api/articles/${id}`, data);
    },
    onSuccess() {
      navigate(`/articles/${id}`);
    },
  });

  const updateArticle = (data: MutationReqData) => {
    updateArticleMutation.mutate(data);
  };

  const errorMessages = updateArticleMutation.isError
    ? updateArticleMutation.error.response?.data.message
    : undefined;

  return {
    article: updateArticleMutation.data?.data,
    updateArticle,
    isPending: updateArticleMutation.isPending,
    errorMessages,
  };
}
