'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Session } from 'next-auth';

export function MainNav({ session }: { session: Session | null }) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  const routes = [
    { href: '/', label: t('home') },
    { href: '/reviews', label: t('reviews') },
    ...(session?.user?.role === 'admin' ? [{ href: '/tanian', label: t('admin') }] : []),
  ];

  // The pathname from next/navigation includes the locale, so we need to strip it.
  const currentPath = pathname.split('/').slice(2).join('/') || '/';
  const cleanPath = `/${currentPath.split('/')[0]}`;


  return (
    <nav className="hidden items-center space-x-4 md:flex lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            (route.href === '/' && currentPath === '/') || (route.href !== '/' && cleanPath.startsWith(route.href))
              ? 'text-primary'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
