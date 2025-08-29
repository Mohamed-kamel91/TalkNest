import {
  render as rtlRender,
  type RenderOptions,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';

import { AppProvider } from '../app/provider';

export const renderApp = (
  ui: React.ReactElement,
  {
    url = '/',
    path = '/',
    ...renderOptions
  }: Record<string, any> & RenderOptions = {},
) => {
  const router = createMemoryRouter(
    [
      {
        path: path,
        element: ui,
      },
    ],
    {
      initialEntries: url ? ['/', url] : ['/'],
      initialIndex: url ? 1 : 0,
    },
  );

  return {
    ...rtlRender(ui, {
      wrapper: () => {
        return (
          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
        );
      },
      ...renderOptions,
    }),
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { userEvent, rtlRender };
