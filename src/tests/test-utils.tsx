import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
  type RenderOptions,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cookies from 'js-cookie';
import {
  RouterProvider,
  createMemoryRouter,
  type RouteObject,
} from 'react-router';

import { createUser as generateUser } from './data-generators';
import { AppProvider } from '../app/provider';
import { db } from './mocks/db';
import { AUTH_COOKIE, authenticate, hash } from './mocks/utils';

export const createUser = async (userProperties?: any) => {
  const user = generateUser(userProperties) as any;
  await db.user.create({ ...user, password: hash(user.password) });
  return user;
};

export const loginAsUser = async (user: any) => {
  const result = await authenticate(user);
  if (result.success) {
    Cookies.set(AUTH_COOKIE, result.data.jwt);
    return result.data.user;
  }
};

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByTestId(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 },
  );

const initializeUser = async (user: any) => {
  if (typeof user === 'undefined') {
    const newUser = await createUser();
    return loginAsUser(newUser);
  } else if (user) {
    return loginAsUser(user);
  } else {
    return null;
  }
};

type RenderAppOptions = Omit<RenderOptions, 'queries'> &
  Partial<{
    user: string | null;
    url: string;
    path: string;
    routes: RouteObject[];
  }>;

export const renderApp = async (
  ui: React.ReactNode,
  renderOptions: RenderAppOptions = {},
) => {
  const {
    user,
    url = '/',
    path = '/',
    routes = [],
    ...restRenderOptions
  } = renderOptions;

  // Pass "null" as the user to render the app unauthenticated
  const initializedUser = await initializeUser(user);

  const router = createMemoryRouter(
    [
      {
        path,
        element: ui,
      },
      ...routes,
    ],
    {
      initialEntries: url ? ['/', url] : ['/'],
      initialIndex: url ? 1 : 0,
    },
  );

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: () => {
        return (
          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
        );
      },
      ...restRenderOptions,
    }),
    user: initializedUser,
  };

  await waitForLoadingToFinish();

  return returnValue;
};

export * from '@testing-library/react';
export { userEvent, rtlRender };
