import { env } from '@/config/env';

import { seedDb } from './db/seeds';

export const enableMocking = async () => {
  if (env.ENABLE_API_MOCKING) {
    const { worker } = await import('./browser');
    const { initializeDb } = await import('./db');
    await initializeDb();
    await seedDb();
    return worker.start({
      onUnhandledRequest: (request) => {
        // Allow image requests to pass through without warnings
        if (
          request.url.includes('dicebear.com') ||
          request.destination === 'image'
        ) {
          return;
        }
      },
    });
  }
};
