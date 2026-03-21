import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type AuthorizedUserApiSchema, privateApi } from 'src/shared/api';

import type { AxiosError, AxiosResponse } from 'axios';

export interface MutationReqData {
  file: File;
}

export default function useDeleteAvatar() {
  const queryClient = useQueryClient();
  const deleteAvatarMutation = useMutation<
    AxiosResponse<AuthorizedUserApiSchema>,
    AxiosError<{ message: string | string[] }>
  >({
    mutationFn: () => {
      return privateApi.delete('/api/users/me/avatar');
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });

  const deleteAvatar = () => {
    deleteAvatarMutation.mutate();
  };

  const errorMessages = deleteAvatarMutation.isError
    ? deleteAvatarMutation.error.response?.data.message
    : undefined;

  return {
    deleteAvatar,
    isPending: deleteAvatarMutation.isPending,
    errorMessages,
  };
}
