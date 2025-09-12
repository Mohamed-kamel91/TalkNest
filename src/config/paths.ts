import { createAuthPath, createPath } from '@/lib/utils/path';

const AUTH_BASE = '/auth';

export const paths = {
  home: createPath('/'),

  auth: {
    register: createAuthPath(`${AUTH_BASE}/register`),
    login: createAuthPath(`${AUTH_BASE}/login`),
  },
} as const;
