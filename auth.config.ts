import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // Credentials provider will be added in auth.ts
  ],
} satisfies NextAuthConfig;
