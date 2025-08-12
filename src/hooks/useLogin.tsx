import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { publicApi } from 'src/shared/api';
import { useSession } from 'src/stores/useSession';

import type { AxiosError, AxiosResponse } from 'axios';

export interface LoginMutationReqData {
  email: string;
  password: string;
}

export function useLogin() {
  const navigate = useNavigate();

  const session = useSession();

  const loginMutation = useMutation<
    AxiosResponse<{ access_token: string }>,
    AxiosError<{ message: string[] }>,
    LoginMutationReqData
  >({
    mutationFn: (data: LoginMutationReqData) => {
      return publicApi.post<{ access_token: string }>('/api/auth/login', data);
    },
    onSuccess({ data }) {
      session.login(data.access_token);
      navigate('/');
    },
  });

  const login = (data: LoginMutationReqData) => {
    loginMutation.mutate(data);
  };

  const errorMessages = loginMutation.isError
    ? loginMutation.error.response?.data.message
    : undefined;

  return {
    login,
    isPending: loginMutation.isPending,
    errorMessages,
  };
}
