import { Request } from 'undici';
import '@testing-library/jest-dom/vitest';

import { queryClient } from '@/lib/api/query-client';
import { server } from '@/tests/mocks/server';

import { initializeDb, resetDb } from './mocks/db';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());

beforeEach(() => {
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  vi.stubGlobal('ResizeObserver', ResizeObserverMock);

  window.btoa = (str: string) =>
    Buffer.from(str, 'binary').toString('base64');
  window.atob = (str: string) =>
    Buffer.from(str, 'base64').toString('binary');

  initializeDb();
});

afterEach(() => {
  server.resetHandlers();
  resetDb();
  queryClient.clear();
});

// Override Node's built-in Request with Undici's spec-compliant version.
// Reason: MSW and React Query expect the browser-like WHATWG Request API,
// but Node's native Request has typing/runtime mismatches (e.g. Headers iterator).
// This ensures consistent behavior between tests (Node) and the browser.
(globalThis.Request as unknown) = Request as any;
