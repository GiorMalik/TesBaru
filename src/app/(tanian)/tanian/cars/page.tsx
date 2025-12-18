import { db } from "@/lib/db";
import { cars } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { CarForm } from "./_components/car-form";
import { DeleteCarButton } from "./_components/delete-button";
import { CheckCircle, XCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

async function getCars() {
    if (!db) return [];
    try {
        return await db.select().from(cars).orderBy(desc(cars.name));
    } catch (e) {
        return [];
    }
}

export default async function AdminCarsPage() {
    const allCars = await getCars();
    
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8 text-white">Manajemen Mobil</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                    <CarForm />
                </div>
                <div className="lg:col-span-2">
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-green-500/20">
                        <h2 className="text-xl font-semibold mb-4 text-white">Daftar Mobil</h2>
                        <div className="space-y-4">
                            {allCars.map(car => (
                                <div key={car.id} className="flex items-center justify-between p-4 bg-gray-900/70 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <Image src={car.imageUrl} alt={car.name} width={80} height={50} className="rounded-md object-cover"/>
                                        <div>
                                            <h3 className="font-semibold text-white">{car.name}</h3>
                                            <p className="text-sm text-primary">{formatCurrency(car.price)}/hari</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {car.isAvailable ? (
                                            <span className="flex items-center gap-1 text-xs text-green-400"><CheckCircle size={14}/> Tersedia</span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-xs text-red-400"><XCircle size={14}/> Disembunyikan</span>
                                        )}
                                        <CarForm car={car} />
                                        <DeleteCarButton id={car.id} />
                                    </div>
                                </div>
                            ))}
                            {allCars.length === 0 && (
                                <p className="text-center text-gray-400 py-8">Belum ada mobil.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
