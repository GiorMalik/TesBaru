// File ini akan dikonfigurasi pada langkah selanjutnya
// Ini adalah placeholder untuk konfigurasi Auth.js
import NextAuth from 'next-auth';
// @ts-ignore
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';

// Placeholder untuk provider, akan diisi nanti
const providers: any[] = [];

export const { handlers, auth, signIn, signOut } = NextAuth({
  // @ts-ignore
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  providers,
  callbacks: {
    // Placeholder untuk callbacks
  },
  session: {
    strategy: 'jwt',
  },
});
