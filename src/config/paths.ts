import { createAuthPath, createPath } from '@/lib/utils/path';

export const paths = {
  auth: {
    register: createAuthPath('/register'),
    login: createAuthPath('/login'),
  },

  app: {
    root: createPath('/'),

    latest: {
      path: 'latest',
      getHref: () => '/latest',
    },
    trending: {
      path: 'trending',
      getHref: () => '/trending',
    },
    top: {
      path: 'top',
      getHref: () => '/top',
    },
  },
} as const;
