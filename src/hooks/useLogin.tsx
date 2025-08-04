import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { publicApi } from 'src/config/api';
import { useSession } from 'src/stores/useSession';

export interface LoginMutationReqData {
  email: string;
  password: string;
}

export function useLogin() {
  const navigate = useNavigate();

  const session = useSession();

  const loginMutation = useMutation({
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

  const errorMessage = loginMutation.isError
    ? loginMutation.error.message
    : undefined;

  return {
    login,
    isPending: loginMutation.isPending,
    errorMessage,
  };
}
