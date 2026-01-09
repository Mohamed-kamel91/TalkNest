import { isAxiosError } from 'axios';

import type { ApiErrorResponse } from '@/types/api';

export const getErrorMessage = (
  error: unknown,
  fallbackMessage: string = 'Oops, Something went wrong!',
): string => {
  // Handle Axios errors
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message || fallbackMessage;
  }

  // Handle native Error objects
  if (error instanceof Error) {
    return error.message || fallbackMessage;
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  return fallbackMessage;
};

// Optional: More specific error handling utilities
export const getErrorCode = (error: unknown): string | undefined => {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.code;
  }
  return undefined;
};

export const getErrorDescription = (error: unknown): unknown => {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.description;
  }
  return undefined;
};
