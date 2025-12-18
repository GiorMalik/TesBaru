"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import {
  Pencil,
  PlusCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { createOrUpdateCar } from "@/lib/actions-admin";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const CarSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nama wajib diisi"),
  capacity: z.coerce.number().min(1, "Kapasitas wajib diisi"),
  transmission: z.enum(["manual", "automatic"]),
  price: z.coerce.number().min(1, "Harga wajib diisi"),
  imageUrl: z.string().url("URL gambar tidak valid"),
  description: z.string().optional(),
  isAvailable: z.boolean().default(true),
});

type Car = z.infer<typeof CarSchema>;

export function CarForm({ car }: { car?: Car }) {
  const [isOpen, setIsOpen] = useState(car ? false : true);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<Car>({
    resolver: zodResolver(CarSchema),
    defaultValues: car || {
      name: "",
      capacity: 0,
      transmission: "manual",
      price: 0,
      imageUrl: "",
      description: "",
      isAvailable: true,
    },
  });

  const onSubmit = (values: Car) => {
    setError(null);
    startTransition(async () => {
      const result = await createOrUpdateCar(values);
      if (result.error) {
        setError(result.error);
      } else {
        setIsOpen(false);
        form.reset(values);
      }
    });
  };

  if (!isOpen && car) {
    return (
      <Button onClick={() => setIsOpen(true)} variant="outline" size="sm">
        <Pencil className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-green-500/20">
      <h2 className="text-xl font-semibold mb-4 text-white">{car ? 'Edit Mobil' : 'Tambah Mobil Baru'}</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* All form fields go here */}
        <div>
          <Label htmlFor="name">Nama Mobil</Label>
          <Input id="name" {...form.register("name")} className="bg-gray-900" />
          {form.formState.errors.name && <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="imageUrl">URL Gambar</Label>
          <Input id="imageUrl" type="url" placeholder="https://example.com/image.jpg" {...form.register("imageUrl")} className="bg-gray-900" />
           {form.formState.errors.imageUrl && <p className="text-red-500 text-sm mt-1">{form.formState.errors.imageUrl.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="capacity">Kapasitas</Label>
            <Input id="capacity" type="number" {...form.register("capacity")} className="bg-gray-900"/>
            {form.formState.errors.capacity && <p className="text-red-500 text-sm mt-1">{form.formState.errors.capacity.message}</p>}
          </div>
          <div>
            <Label htmlFor="price">Harga/hari (IDR)</Label>
            <Input id="price" type="number" {...form.register("price")} className="bg-gray-900"/>
            {form.formState.errors.price && <p className="text-red-500 text-sm mt-1">{form.formState.errors.price.message}</p>}
          </div>
        </div>
        <div>
            <Label>Transmisi</Label>
            <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-2">
                    <input type="radio" id="manual" value="manual" {...form.register("transmission")} className="accent-primary" />
                    <Label htmlFor="manual">Manual</Label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="radio" id="automatic" value="automatic" {...form.register("transmission")} className="accent-primary"/>
                    <Label htmlFor="automatic">Automatic</Label>
                </div>
            </div>
        </div>
        <div>
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea id="description" {...form.register("description")} className="bg-gray-900"/>
        </div>
        <div className="flex items-center space-x-2">
            <Checkbox id="isAvailable" {...form.register("isAvailable")} defaultChecked={car?.isAvailable ?? true}/>
            <label
                htmlFor="isAvailable"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                Tersedia (Tampilkan di website)
            </label>
        </div>


        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex justify-end gap-2">
            {car && <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Batal</Button>}
            <Button type="submit" disabled={isPending}>
            {isPending ? "Menyimpan..." : (car ? "Simpan Perubahan" : "Tambah Mobil")}
            </Button>
        </div>
      </form>
    </div>
  );
}
