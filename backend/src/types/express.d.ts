import type { AuthUser } from '../repositories/users.js';

declare global {
  namespace Express {
    interface User extends AuthUser {}
  }
}

export {};
