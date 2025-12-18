import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { users } from '@/lib/data';
import type { User } from '@/lib/definitions';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (credentials.email && credentials.password) {
          const user = users.find(u => u.email === credentials.email);
          if (user) {
            const passwordsMatch = await bcrypt.compare(
              credentials.password as string,
              user.passwordHash
            );
            if (passwordsMatch) {
              return { id: user.id, name: user.name, email: user.email, role: user.role, image: user.image };
            }
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as User).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'user' | 'admin';
      }
      return session;
    },
  },
});
