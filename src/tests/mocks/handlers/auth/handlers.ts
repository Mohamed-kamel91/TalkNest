import Cookies from 'js-cookie';
import { HttpResponse, http } from 'msw';

import { authPaths } from './constants';
import { db, persistDb } from '../../db';
import {
  authenticate,
  hash,
  requireAuth,
  AUTH_COOKIE,
  networkDelay,
} from '../../utils';

import type { LoginRequestDTO, RegisterRequestDTO } from './types';

const registerHandler = http.post(
  authPaths.register,
  async ({ request }) => {
    await networkDelay();

    try {
      const registerPayload =
        (await request.json()) as RegisterRequestDTO;

      const existingUser = db.user.findFirst({
        where: {
          email: {
            equals: registerPayload.email,
          },
        },
      });

      if (existingUser) {
        return HttpResponse.json(
          { message: 'This email already exists.' },
          { status: 400 },
        );
      }

      db.user.create({
        ...registerPayload,
        role: 'USER',
        password: hash(registerPayload.password),
      });

      // Sync updated in-memory msw db with local storage / db file
      await persistDb('user');

      const credentials = {
        email: registerPayload.email,
        password: registerPayload.password,
      };

      const result = authenticate(credentials);

      Cookies.set(AUTH_COOKIE, result.jwt, { path: '/' });

      return HttpResponse.json(
        { data: result.user },
        {
          headers: {
            // with a real API, the token cookie should also be Secure and HttpOnly
            'Set-Cookie': `${AUTH_COOKIE}=${result.jwt}; Path=/;`,
          },
        },
      );
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  },
);

const loginHandler = http.post(
  authPaths.login,
  async ({ request }) => {
    await networkDelay();

    try {
      const credentials = (await request.json()) as LoginRequestDTO;
      const result = authenticate(credentials);

      Cookies.set(AUTH_COOKIE, result.jwt, { path: '/' });

      return HttpResponse.json(
        { data: result.user },
        {
          headers: {
            // with a real API, the token cookie should also be Secure and HttpOnly
            'Set-Cookie': `${AUTH_COOKIE}=${result.jwt}; Path=/;`,
          },
        },
      );
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  },
);

const logoutHandler = http.post(authPaths.logout, async () => {
  await networkDelay();

  Cookies.remove(AUTH_COOKIE);

  return HttpResponse.json(
    { message: 'Logged out' },
    {
      headers: {
        'Set-Cookie': `${AUTH_COOKIE}=; Path=/;`,
      },
    },
  );
});

const meHandler = http.get(authPaths.me, async ({ cookies }) => {
  console.log('auth me route');

  await networkDelay();

  try {
    const { user } = requireAuth(cookies);
    return HttpResponse.json({ data: user });
  } catch (error: any) {
    return HttpResponse.json(
      { message: error?.message || 'Server Error' },
      { status: 500 },
    );
  }
});

export const authHandlers = [
  registerHandler,
  loginHandler,
  logoutHandler,
  meHandler,
];
