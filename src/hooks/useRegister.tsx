import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { publicApi } from 'src/config/api';

import type { AxiosError, AxiosResponse } from 'axios';

export interface RegisterMutationReqData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function useRegister() {
  const navigate = useNavigate();

  const registerMutation = useMutation<
    AxiosResponse<{ _id: string }>,
    AxiosError<{ message: string[] }>,
    RegisterMutationReqData
  >({
    mutationFn: ({
      firstname,
      lastname,
      email,
      password,
    }: RegisterMutationReqData) => {
      return publicApi.post<{ _id: string }>('/api/auth/register', {
        firstname,
        lastname,
        email,
        password,
      });
    },
    onSuccess() {
      navigate('/login');
    },
  });

  const register = (data: RegisterMutationReqData) => {
    registerMutation.mutate(data);
  };

  const errorMessages = registerMutation.isError
    ? registerMutation.error.response?.data.message
    : undefined;

  return {
    register,
    isPending: registerMutation.isPending,
    errorMessages,
  };
}
