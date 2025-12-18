import Link from 'next/link';
import { Car } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-2xl font-headline tracking-wider text-foreground", className)}>
      <Car className="h-8 w-8 text-primary glow-icon" />
      <span className="glow-text">GiorBaliTour</span>
    </Link>
  );
}
