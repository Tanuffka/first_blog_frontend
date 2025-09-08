import { AxiosError } from 'axios';

export function catchError(error: Error | AxiosError<{ message: string[] }>) {
  if (typeof error === typeof AxiosError) {
    const message = (error as AxiosError<{ message: string[] }>).response?.data
      .message;
    return Array.isArray(message) ? message[0] : message;
  }

  return (error as Error).message;
}
