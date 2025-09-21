import { configureAuth } from 'react-query-auth';

import { api } from './api-client';

import type {
  LoginInput,
  RegisterInput,
} from '@/features/auth/types';
import type { ApiErrorResponse, User } from '@/types/api';
import type { AxiosError } from 'axios';

// Auth Api's
const getUser = async (): Promise<User> => {
  const response = await api.get('/auth/me');
  return response.data;
};

const loginWithEmailAndPassword = async (
  data: LoginInput,
): Promise<User> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

const registerWithEmailAndPassword = async (
  data: RegisterInput,
): Promise<User> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

const logout = (): Promise<void> => {
  return api.post('/auth/logout');
};

// Auth config
export const {
  useUser,
  useLogin,
  useLogout,
  useRegister,
  AuthLoader,
} = configureAuth<
  User,
  AxiosError<ApiErrorResponse>,
  LoginInput,
  RegisterInput
>({
  userFn: getUser,
  loginFn: loginWithEmailAndPassword,
  registerFn: registerWithEmailAndPassword,
  logoutFn: logout,
});
