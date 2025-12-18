import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

// The 'auth' export from NextAuth(...) is now used in middleware.
// It is the official way to protect pages in Next.js 14+
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
