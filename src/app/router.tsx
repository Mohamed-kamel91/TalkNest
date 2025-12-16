import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { ErrorFallback } from '@/components/errors';
import { AppLayout } from '@/components/layouts';
import { paths } from '@/config/paths';

import { RestrictedRoute } from './routes/guards';

const router = createBrowserRouter([
  {
    Component: RestrictedRoute,
    ErrorBoundary: ErrorFallback,
    children: [
      {
        path: paths.auth.login.path,
        lazy: () =>
          import('./routes/auth/login').then(({ Login }) => ({
            Component: Login,
          })),
      },
      {
        path: paths.auth.register.path,
        lazy: () =>
          import('./routes/auth/register').then(({ Register }) => ({
            Component: Register,
          })),
      },
    ],
  },
  {
    path: paths.app.root.path,
    Component: AppLayout,
    children: [
      {
        index: true,
        lazy: () =>
          import('./routes/app/posts').then(({ Posts }) => ({
            Component: Posts,
          })),
      },
      {
        path: 'posts',
        lazy: () =>
          import('./routes/app/posts').then(({ Posts }) => ({
            Component: Posts,
          })),
      },
      {
        path: 'popular',
        Component: () => <h1>Popular</h1>,
      },
      {
        path: 'explore',
        Component: () => <h1>Explore</h1>,
      },
    ],
  },
  {
    path: '*',
    Component: () => <h1>Not Found</h1>,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
