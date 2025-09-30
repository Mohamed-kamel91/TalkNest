import { env } from '@/config/env';

const BASE_PATH = `${env.API_URL}/auth`;

export const authPaths = {
  login: `${BASE_PATH}/login`,
  register: `${BASE_PATH}/register`,
  logout: `${BASE_PATH}/logout`,
  me: `${BASE_PATH}/me`,
};
