import { authHandlers } from './auth/handlers';
import { postHandlers } from './posts/handlers';

export const handlers = [...authHandlers, ...postHandlers];
