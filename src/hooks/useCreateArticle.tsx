import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { privateApi } from 'src/shared/api';

import type { AxiosError, AxiosResponse } from 'axios';

export interface MutationReqData {
  title: string;
  content: string;
}

export function useCreateArticle() {
  const navigate = useNavigate();

  const createArticleMutation = useMutation<
    AxiosResponse<{
      title: string;
      content: string;
    }>,
    AxiosError<{ message: string[] }>,
    MutationReqData
  >({
    mutationFn: (data: MutationReqData) => {
      return privateApi.post('/api/articles', data);
    },
    onSuccess() {
      navigate('/');
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
