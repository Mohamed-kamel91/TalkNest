import Cookies from 'js-cookie';
import { delay } from 'msw';
import { customAlphabet } from 'nanoid';

import { db } from './db/db';

import type { Model } from './db';
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

type AuthResult =
  | {
      success: true;
      data: {
        user: User;
        jwt: string;
      };
    }
  | {
      success: false;
      error: {
        message: string;
        code?: string;
        statusCode?: number;
      };
    };

export function authenticate(credentials: {
  email: string;
  password: string;
}): AuthResult {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: credentials.email,
      },
    },
  });

  const isCorrectPassword =
    user?.password === hash(credentials.password);

  if (!user || !isCorrectPassword) {
    return {
      success: false,
      error: {
        message: 'Invalid email or password. Please try again.',
        code: 'INVALID_CREDENTIALS',
        statusCode: 401,
      },
    };
  }

  const tokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role as TokenPayload['role'],
  };

  const sanitizedUser = sanitizeUser(user) as User;
  const encodedToken = encode(tokenPayload);

  return {
    success: true,
    data: {
      user: sanitizedUser,
      jwt: encodedToken,
    },
  };
}

export const AUTH_COOKIE = 'talknest-token';

export function requireAuth(cookies: Record<string, string>) {
  try {
    const token = cookies[AUTH_COOKIE] || Cookies.get(AUTH_COOKIE);

    if (!token) {
      return {
        message: 'Authentication required. Please login.',
        code: 'NO_TOKEN',
        statusCode: 401,
      };
    }

    // In real api server, token expiration error be checked
    // {
    //   "message": "Your session has expired. Please log in again."
    //   "code": "TOKEN_EXPIRED",
    //   "statusCode": 401,
    // }

    const decodedToken = decode(token);

    //  In real api server, token validity error should be handled
    // {
    //   message: 'Invalid session. Please log in again.',
    //   code: 'INVALID_TOKEN',
    //   "statusCode": 401,
    // };

    const user = db.user.findFirst({
      where: {
        id: {
          equals: decodedToken.id,
        },
      },
    });

    if (!user) {
      return {
        message: "This user doesn't exist. Please login again.",
        code: 'USER_NOT_FOUND',
        statusCode: 404,
      };
    }

    return {
      user: sanitizeUser(user),
    };
  } catch (error: any) {
    return {
      message:
        error?.message || 'Authentication failed. Please login.',
      code: 'AUTHENTICATION_ERROR',
      statusCode: 401,
    };
  }
}

export function requireAdmin(user: any) {
  if (user.role !== 'ADMIN') {
    throw Error('Unauthorized');
  }
}

export const slugExists = (slug: string, model: Model): boolean => {
  return !!db[model].findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });
};

export const slugify = (text: string): string => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
};

export const generateSlugId = customAlphabet(
  'abcdefghijklmnopqrstuvwxyz0123456789',
  6,
);
