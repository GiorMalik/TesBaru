import { db } from "@/lib/db";
import { cars } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Users, Gauge, Fuel, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

async function getCarDetails(id: string) {
  if (!db) return null;
  try {
    const car = await db.query.cars.findFirst({
      where: eq(cars.id, id),
    });
    return car;
  } catch (error) {
    console.error("Database query failed for car details:", error);
    return null;
  }
}

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const car = await getCarDetails(params.id);

  if (!car || !car.isAvailable) {
    notFound();
  }
  
  const whatsappLink = `https://wa.me/6285854965523?text=Halo%20GiorBaliTour,%20saya%20tertarik%20untuk%20menyewa%20mobil%20${encodeURIComponent(car.name)}.`;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg shadow-green-500/20">
          <Image
            src={car.imageUrl}
            alt={car.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">{car.name}</h1>
          <p className="text-gray-300 mb-6">{car.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6 text-gray-300">
            <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
              <span>{car.capacity} Penumpang</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
              <Gauge className="w-6 h-6 text-primary" />
              <span className="capitalize">{car.transmission}</span>
            </div>
             <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-primary" />
              <span>10 Jam Layanan</span>
            </div>
             <div className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
              <Fuel className="w-6 h-6 text-primary" />
              <span>Termasuk Bensin</span>
            </div>
          </div>
          
          <div className="mt-auto pt-6 border-t border-green-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <p className="text-sm text-gray-400">Harga per hari</p>
                <p className="text-3xl font-bold text-primary">{formatCurrency(car.price)}</p>
            </div>
            <Button size="lg" asChild className="w-full sm:w-auto">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Sewa Sekarang via WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
