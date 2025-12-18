import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Gauge, IndianRupee } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

type Car = {
  id: string;
  name: string;
  capacity: number;
  transmission: 'manual' | 'automatic';
  price: number;
  imageUrl: string;
  description: string | null;
}

export function CarCard({ car }: { car: Car }) {
  return (
    <Card className="flex flex-col overflow-hidden bg-gray-800/50 border-green-500/20 shadow-lg hover:shadow-neon-green/30 transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={car.imageUrl}
            alt={car.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-xl text-white mb-2">{car.name}</CardTitle>
        <div className="flex justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span>{car.capacity} Penumpang</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-primary" />
            <span className="capitalize">{car.transmission}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-black/20">
        <div className="text-lg font-bold text-primary">
          {formatCurrency(car.price)}<span className="text-sm font-normal text-gray-400">/hari</span>
        </div>
        <Button asChild size="sm">
          <Link href={`/cars/${car.id}`}>Lihat Detail</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
