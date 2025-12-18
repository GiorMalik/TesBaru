import Image from "next/image";
import { db } from "@/lib/db";
import { cars, reviews } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { CarCard } from "@/components/car-card";
import { ReviewCard } from "@/components/review-card";
import { ReviewForm } from "@/components/review-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getFeaturedCars() {
  if (!db) return [];
  try {
    const featuredCars = await db.select()
      .from(cars)
      .where(eq(cars.isAvailable, true))
      .limit(3);
    return featuredCars;
  } catch (error) {
    console.error("Database query failed for featured cars:", error);
    return [];
  }
}

async function getRecentReviews() {
  if (!db) return [];
  try {
    const recentReviews = await db.select()
      .from(reviews)
      .orderBy(desc(reviews.createdAt))
      .limit(3);
    return recentReviews;
  } catch (error) {
    console.error("Database query failed for recent reviews:", error);
    return [];
  }
}

export default async function Home() {
  const featuredCarsData = getFeaturedCars();
  const recentReviewsData = getRecentReviews();
  const [featuredCars, recentReviews] = await Promise.all([featuredCarsData, recentReviewsData]);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image 
          src="https://images.unsplash.com/photo-1554497349-5f8a5a4a7698?q=80&w=2070&auto=format&fit=crop"
          alt="Pemandangan sawah di Bali"
          fill
          priority
          className="object-cover"
        />
        <div className="relative z-20 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-shadow-lg">
            Jelajahi Bali Dengan Gaya
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200 mb-8">
            Sewa mobil 10 jam termasuk supir dan bensin. Nikmati perjalanan tanpa khawatir.
          </p>
          <Button size="lg" asChild>
            <Link href="/cars">Lihat Pilihan Mobil</Link>
          </Button>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section id="featured-cars" className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Mobil Pilihan Kami</h2>
        <p className="text-center text-gray-400 mb-12">Pilihan populer untuk petualangan Anda di Bali.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild variant="outline">
                <Link href="/cars">Lihat Semua Mobil</Link>
            </Button>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="bg-gray-900/50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Ulasan Pelanggan</h2>
          <p className="text-center text-gray-400 mb-12">Lihat apa kata mereka tentang layanan kami.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {recentReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <ReviewForm />
        </div>
      </section>
    </div>
  );
}
