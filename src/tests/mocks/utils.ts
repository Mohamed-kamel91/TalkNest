import Cookies from 'js-cookie';
import { delay } from 'msw';

import { db } from './db/db';

import type { User } from '@/types/api';

type TokenPayload = Pick<User, 'id' | 'email' | 'role'>;

export const encode = <P extends TokenPayload>(
  payload: P,
): string => {
  const btoa =
    typeof window === 'undefined'
      ? (str: string) => Buffer.from(str, 'binary').toString('base64')
      : window.btoa;
  return btoa(JSON.stringify(payload));
};

export const decode = <P extends TokenPayload>(token: string): P => {
  const atob =
    typeof window === 'undefined'
      ? (t: string) => Buffer.from(t, 'base64').toString('binary')
      : window.atob;
  return JSON.parse(atob(token));
};

export const hash = (str: string) => {
  let hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
};

export const networkDelay = () => {
  const delayTime = import.meta.env.TEST
    ? 200
    : Math.floor(Math.random() * 700) + 300;
  return delay(delayTime);
};

const omit = <T extends object>(obj: T, keys: string[]): T => {
  const result = {} as T;
  for (const key in obj) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }

  return result;
};

export const sanitizeUser = <O extends object>(user: O) =>
  omit<O>(user, ['password', 'iat']);

export function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (user?.password === hash(password)) {
    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role as TokenPayload['role'],
    };

    const sanitizedUser = sanitizeUser(user);
    const encodedToken = encode(tokenPayload);

    return {
      user: sanitizedUser,
      jwt: encodedToken,
    };
  }

  throw new Error('Invalid email or password. Please try again.');
}

export const AUTH_COOKIE = 'talknest-token';

export function requireAuth(cookies: Record<string, string>) {
  try {
    const encodedToken =
      cookies[AUTH_COOKIE] || Cookies.get(AUTH_COOKIE);

    if (!encodedToken) {
      return {
        error: 'Unauthorized',
        user: null,
      };
    }

    const decodedToken = decode(encodedToken);

    const user = db.user.findFirst({
      where: {
        id: {
          equals: decodedToken.id,
        },
      },
    });

    if (!user) {
      return {
        error: 'Unauthorized',
        user: null,
      };
    }

    return {
      user: sanitizeUser(user),
    };
  } catch (err: any) {
    console.error('Auth error:', err);
    return {
      error: 'Unauthorized',
      user: null,
    };
  }
}

export function requireAdmin(user: any) {
  if (user.role !== 'ADMIN') {
    throw Error('Unauthorized');
  }
}
