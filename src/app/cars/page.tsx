import { db } from "@/lib/db";
import { cars } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { CarCard } from "@/components/car-card";

export const dynamic = 'force-dynamic';

async function getAvailableCars() {
  if (!db) return [];
  try {
    const availableCars = await db.select()
      .from(cars)
      .where(eq(cars.isAvailable, true))
      .orderBy(desc(cars.price));
    return availableCars;
  } catch (error) {
    console.error("Database query failed for available cars:", error);
    return [];
  }
}

export default async function CarsPage() {
  const availableCars = await getAvailableCars();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">Semua Mobil Kami</h1>
      <p className="text-center text-gray-400 mb-12">
        Temukan mobil yang sempurna untuk petualangan Anda di Bali. Semua harga sudah termasuk supir & bensin selama 10 jam.
      </p>
      
      {availableCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {availableCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400">Saat ini tidak ada mobil yang tersedia. Silakan cek kembali nanti.</p>
        </div>
      )}
    </div>
  );
}
