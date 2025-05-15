import type { UserRole } from '@prisma/client';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's role. */
      role: UserRole | null;
    } & DefaultSession['user'];
  }
}
