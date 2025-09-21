import Axios, {
  type AxiosInstance,
  type CreateAxiosDefaults,
} from 'axios';

import { env } from '@/config/env';
import { paths } from '@/config/paths';

const axiosConfig: CreateAxiosDefaults = {
  baseURL: env.API_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 5000,
};

export const api: AxiosInstance = Axios.create(axiosConfig);

api.interceptors.response.use(
  (response) => response.data, // we only care about the data, we leave the state of api to reat query
  (error) => {
    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo =
        searchParams.get('redirectTo') || window.location.pathname;
      window.location.href = paths.auth.login.getHref(redirectTo);
    }

    return Promise.reject(error);
  },
);
