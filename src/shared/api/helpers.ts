import { type AxiosError, isAxiosError } from 'axios';

export function catchError(error: Error | AxiosError<{ message: string[] }>) {
  if (isAxiosError(error)) {
    const message = error.response?.data.message;
    return Array.isArray(message) ? message[0] : message;
  }

  return error.message;
}
