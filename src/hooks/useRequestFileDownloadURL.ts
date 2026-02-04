import { useMutation } from '@tanstack/react-query';

import { privateApi } from 'src/shared/api';

import type { AxiosError, AxiosResponse } from 'axios';

export interface MutationReqData {
  fileKey: string;
}

export function useRequestFileDownloadURL() {
  const mutation = useMutation<
    AxiosResponse<string>,
    AxiosError<{ message: string[] }>,
    MutationReqData
  >({
    mutationFn: (data) => {
      return privateApi.post('/api/file-storage/download-url', data);
    },
  });

  const requestFileDownloadURL = (data: MutationReqData) => {
    return mutation.mutateAsync(data);
  };

  return {
    requestFileDownloadURL,
    isPending: mutation.isPending,
  };
}
