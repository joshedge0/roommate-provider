import NextAuth, { type NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import Google from 'next-auth/providers/google';
import type { User } from '@prisma/client';

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  pages: {
    newUser: '/login',
  },
  callbacks: {
    session({ session, user }) {
      session.user.role = (user as User).role;
      return session;
    },
  },
};
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
