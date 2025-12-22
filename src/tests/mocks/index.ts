import { env } from '@/config/env';

import { seedDb } from './db/seeds';

export const enableMocking = async () => {
  if (env.ENABLE_API_MOCKING) {
    const { worker } = await import('./browser');
    const { initializeDb } = await import('./db');
    await initializeDb();
    await seedDb();
    return worker.start();
  }
};
