import { env } from '@/config/env';

const BASE_PATH = `${env.API_URL}/posts`;

export const postsPaths = {
  posts: `${BASE_PATH}`,
  createPost: BASE_PATH,
};
