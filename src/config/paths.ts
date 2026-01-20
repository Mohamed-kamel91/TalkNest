import { createAuthPath, createPath } from '@/lib/utils/path';
import { slugify } from '@/lib/utils/slug';

export const paths = {
  auth: {
    register: createAuthPath('/register'),
    login: createAuthPath('/login'),
  },

  home: {
    feed: {
      ...createPath('/'),
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
  },

  topic: {
    path: '/t/:topic',
    getHref: (topic: string) => `/t/${slugify(topic)}`,
  },

  post: {
    new: {
      path: '/new-post',
      getHref: () => '/new-post',
    },
  },
} as const;
