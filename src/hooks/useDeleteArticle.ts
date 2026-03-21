import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { type ArticleApiResponseSchema, privateApi } from 'src/shared/api';

import type { AxiosError, AxiosResponse } from 'axios';

export interface MutationReqData {
  id: string;
}

export function useDeleteArticle(id: string) {
  const navigate = useNavigate();

  const deleteArticleMutation = useMutation<
    AxiosResponse<Pick<ArticleApiResponseSchema, '_id'>>,
    AxiosError<{ message: string[] }>
  >({
    mutationFn: () => {
      return privateApi.delete(`/api/articles/${id}`);
    },
    onSuccess() {
      navigate('/');
    },
  });

  const deleteArticle = () => {
    deleteArticleMutation.mutate();
  };

  const errorMessages = deleteArticleMutation.isError
    ? deleteArticleMutation.error.response?.data.message
    : undefined;

  return {
    deleteArticle,
    isPending: deleteArticleMutation.isPending,
    errorMessages,
  };
}
