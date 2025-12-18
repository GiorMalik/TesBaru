import NextAuth, { type NextAuthConfig } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          
          if (!db) return null;

          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string;
        // @ts-ignore
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      
      if (!db) return token;

      const existingUser = await db.query.users.findFirst({
        where: eq(users.id, token.sub),
      });
      
      if (!existingUser) return token;

      // @ts-ignore
      token.role = existingUser.role;

      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
