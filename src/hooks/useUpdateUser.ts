import { useMutation } from '@tanstack/react-query';

import { type AuthorizedUserApiSchema, privateApi } from 'src/shared/api';

import type { AxiosError, AxiosResponse } from 'axios';

export interface MutationReqData {
  firstname: string;
  lastname: string;
  bio: string;
}

export function useUpdateUser(id?: string) {
  const updateUserMutation = useMutation<
    AxiosResponse<AuthorizedUserApiSchema>,
    AxiosError<{ message: string[] }>,
    MutationReqData
  >({
    mutationFn: (data) => {
      return privateApi.put(`/api/users/${id}`, data);
    },
  });

  const updateUser = (data: MutationReqData) => {
    if (!id) {
      throw new Error('Update user: "id" param is required');
    }

    return updateUserMutation.mutateAsync(data);
  };

  const errorMessages = updateUserMutation.isError
    ? updateUserMutation.error.response?.data.message
    : undefined;

  return {
    user: updateUserMutation.data?.data,
    updateUser,
    isPending: updateUserMutation.isPending,
    errorMessages,
  };
}
