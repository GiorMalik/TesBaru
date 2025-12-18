import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { cars } from '@/lib/data';
import { CarCard } from '@/components/car-card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default async function HomePage() {
  const t = await getTranslations('HomePage');
  const availableCars = cars.filter(car => car.is_available);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');

  return (
    <>
      <section className="relative h-[60vh] min-h-[500px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container text-center">
            <h1 className="mb-4 font-headline text-5xl md:text-7xl lg:text-8xl glow-text">
              {t('heroTitle')}
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
              {t('heroSubtitle')}
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="#fleet">
                {t('heroButton')}
                <ArrowDown className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="fleet" className="container py-16 sm:py-24">
        <h2 className="mb-12 text-center font-headline text-4xl md:text-5xl">
          {t('carListTitle')}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </>
  );
}
