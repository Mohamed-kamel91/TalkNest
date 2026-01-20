import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { RootErrorFallback } from '@/components/errors';
import { AppLayout, ContentLayout } from '@/components/layouts';
import { paths } from '@/config/paths';

import { ProtectedRoute, RestrictedRoute } from './routes/guards';

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
    Component: AppLayout,
    children: [
      // Home Feed
      {
        path: paths.home.feed.path,
        lazy: () =>
          import('./routes/app/home').then(({ Home }) => ({
            Component: Home,
          })),
      },
      {
        path: paths.home.feed.latest.path,
        lazy: () =>
          import('./routes/app/home').then(({ Home }) => ({
            Component: Home,
          })),
      },
      {
        path: paths.home.feed.top.path,
        lazy: () =>
          import('./routes/app/home').then(({ Home }) => ({
            Component: Home,
          })),
      },
      {
        path: paths.home.feed.trending.path,
        lazy: () =>
          import('./routes/app/home').then(({ Home }) => ({
            Component: Home,
          })),
      },

      // New Post
      {
        Component: ProtectedRoute,
        children: [
          {
            path: '/new-post',
            lazy: () =>
              import('./routes/app/new-post').then(({ NewPost }) => ({
                Component: NewPost,
              })),
          },
        ],
      },

      // Popular Feed
      {
        path: 'popular',
        Component: () => {
          return (
            <ContentLayout title="Popular">
              <h1>This Popular page</h1>
            </ContentLayout>
          );
        },
      },

      // Explore Topics
      {
        path: '/explore',
        Component: () => {
          return (
            <ContentLayout title="Explore">
              <h1>This Explore page</h1>
            </ContentLayout>
          );
        },
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
