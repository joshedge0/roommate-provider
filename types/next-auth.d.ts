import type { UserRole } from '@prisma/client';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role: UserRole | null;
    } & DefaultSession['user'];
  }
}
