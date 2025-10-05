import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type AuthorizedUserApiSchema, privateApi } from 'src/shared/api';

import type { AxiosError, AxiosResponse } from 'axios';

export interface MutationReqData {
  file: File;
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  const updateAvatarMutation = useMutation<
    AxiosResponse<AuthorizedUserApiSchema>,
    AxiosError<{ message: string | string[] }>,
    MutationReqData
  >({
    mutationFn: (data) => {
      const formData = new FormData();
      formData.append('file', data.file);
      return privateApi.put('/api/users/me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });

  const uploadAvatar = (data: MutationReqData) => {
    if (!File) {
      throw new Error('Update avatar: image is required');
    }
    return updateAvatarMutation.mutateAsync(data);
  };

  const errorMessages = updateAvatarMutation.isError
    ? updateAvatarMutation.error.response?.data.message
    : undefined;

  return {
    user: updateAvatarMutation.data?.data,
    uploadAvatar,
    isPending: updateAvatarMutation.isPending,
    errorMessages:
      typeof errorMessages === 'string' ? [errorMessages] : errorMessages,
  };
}
