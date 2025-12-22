import { env } from '@/config/env';

const BASE_PATH = `${env.API_URL}/comments`;

export const postsPaths = {
  posts: `${BASE_PATH}/posts`,
};
