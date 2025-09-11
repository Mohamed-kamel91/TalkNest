import Axios, { type AxiosInstance } from 'axios';

import { env } from '@/config/env';

export const api: AxiosInstance = Axios.create({
  baseURL: env.API_URL,
});
