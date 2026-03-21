import { useMutation } from '@tanstack/react-query';

import { privateApi } from 'src/shared/api';

import type { AxiosError, AxiosResponse } from 'axios';

export interface MutationReqData {
  fileKey: string;
}

export interface MutationResData {
  fileKey: string;
  fileUploadUrl: string;
}

export function useRequestFileUploadURL() {
  const mutation = useMutation<
    AxiosResponse<MutationResData>,
    AxiosError<{ message: string[] }>,
    MutationReqData
  >({
    mutationFn: (data) => {
      return privateApi.post('/api/file-storage/upload-url', data);
    },
  });

  const requestFileUploadURL = (data: MutationReqData) => {
    return mutation.mutateAsync(data);
  };

  return {
    requestFileUploadURL,
    isPending: mutation.isPending,
  };
}
