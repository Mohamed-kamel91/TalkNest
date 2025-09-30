import type { LoginInput, RegisterInput } from '../types';

export const defaultLoginValues: LoginInput = {
  email: '',
  password: '',
};

export const defaultRegisterValues: RegisterInput = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};
