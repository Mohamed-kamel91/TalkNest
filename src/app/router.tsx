import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { ErrorFallback } from '@/components/errors';

import { ProtectedRoute, RestrictedRoute } from './routes/guards';

const router = createBrowserRouter([
  {
    Component: RestrictedRoute,
    ErrorBoundary: ErrorFallback,
    children: [
      {
        path: '/login',
        lazy: () =>
          import('./routes/auth/login').then(({ Login }) => ({
            Component: Login,
          })),
      },
      {
        path: '/register',
        lazy: () =>
          import('./routes/auth/register').then(({ Register }) => ({
            Component: Register,
          })),
      },
    ],
  },
  {
    path: '/',
    Component: ProtectedRoute,
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
