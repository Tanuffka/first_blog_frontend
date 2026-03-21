import { useMutation, useQueryClient } from '@tanstack/react-query';

import { privateApi } from 'src/shared/api';

import type { AxiosError, AxiosResponse } from 'axios';

export interface MutationReqData {
  content: string;
  article: string;
}

export function useCreateComment(id: string) {
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation<
    AxiosResponse<{
      content: string;
    }>,
    AxiosError<{ message: string[] }>,
    MutationReqData
  >({
    mutationFn: (data) => {
      return privateApi.post('/api/comments', data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['comments', { id }] });
    },
  });

  const createComment = (content: string) => {
    createCommentMutation.mutate({ content, article: id });
  };

  const errorMessages = createCommentMutation.isError
    ? createCommentMutation.error.response?.data.message
    : undefined;

  return {
    createComment,
    isPending: createCommentMutation.isPending,
    errorMessages,
  };
}
