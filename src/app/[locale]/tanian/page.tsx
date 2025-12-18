import { getTranslations } from "next-intl/server";
import { CarDataTable } from "@/components/tanian/car-data-table";
import { cars } from "@/lib/data";

export default async function AdminPage() {
  const t = await getTranslations('Admin');
  const allCars = cars; // In a real app, you would fetch this from a database

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      <p className="text-muted-foreground">{t('description')}</p>
      <div className="mt-6">
        <CarDataTable data={allCars} />
      </div>
    </div>
  );
}
