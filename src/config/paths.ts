import { createAuthPath, createPath } from '@/lib/utils/path';

export const paths = {
  auth: {
    register: createAuthPath('/register'),
    login: createAuthPath('/login'),
  },

  app: {
    root: createPath('/'),
  },
} as const;
