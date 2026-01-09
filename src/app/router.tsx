import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { RootErrorFallback } from '@/components/errors';
import { AppLayout } from '@/components/layouts';
import { paths } from '@/config/paths';
import { PostsFeed } from '@/features/posts/components/posts-feed';

import { RestrictedRoute } from './routes/guards';

const router = createBrowserRouter([
  {
    Component: RestrictedRoute,
    ErrorBoundary: RootErrorFallback,
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
        path: '/',
        lazy: () =>
          import('./routes/app/home').then(({ Home }) => ({
            Component: Home,
          })),
        children: [
          {
            index: true,
            Component: () => <PostsFeed sort="latest" />,
          },
          {
            path: paths.app.latest.path,
            Component: () => <PostsFeed sort="latest" />,
          },
          {
            path: paths.app.top.path,
            Component: () => <PostsFeed sort="top" />,
          },
          {
            path: paths.app.trending.path,
            Component: () => <PostsFeed sort="trending" />,
          },
        ],
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
