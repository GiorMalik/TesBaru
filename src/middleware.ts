import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {auth} from './auth';

const locales = ['en', 'id', 'zh', 'ko', 'ar', 'tr', 'ru', 'pt'];
const publicPages = ['/login', '/register'];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

const authMiddleware = auth((req) => {
  const { pathname } = req.nextUrl;
  const locale = locales.find(l => pathname.startsWith(`/${l}`)) || 'en';

  if (pathname.includes('/tanian') && req.auth?.user?.role !== 'admin') {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }
  
  return intlMiddleware(req);
});

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = new RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.join('|')})/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    // The type assertion is needed because the `auth` middleware returns a promise,
    // but the middleware function expects a NextResponse or null.
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|id|zh|ko|ar|tr|ru|pt)/:path*']
};
