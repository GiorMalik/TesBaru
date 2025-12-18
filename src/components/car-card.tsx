import Image from "next/image";
import { useTranslations } from "next-intl";
import { Users, Gauge, Zap } from "lucide-react";

import type { Car } from "@/lib/definitions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "./ui/badge";

export function CarCard({ car }: { car: Car }) {
  const t = useTranslations("CarCard");

  return (
    <Card className="flex flex-col overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint="car rental"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-2 font-headline text-2xl tracking-wide">{car.name}</CardTitle>
        <div className="flex justify-around text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span>{t("capacity", { count: car.capacity })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-primary" />
            <span>{t(`transmission_${car.transmission}`)}</span>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex items-center justify-between p-4">
        <div className="font-bold text-xl">
          ${car.price}
          <span className="text-sm font-normal text-muted-foreground">{t("price_per_day")}</span>
        </div>
        <Button>{t("book_now")}</Button>
      </CardFooter>
    </Card>
  );
}
