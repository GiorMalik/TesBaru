"use server";

import { z } from "zod";
import { db } from "./db";
import { cars } from "./db/schema";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const CarSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Nama tidak boleh kosong." }),
  capacity: z.coerce.number().min(1, { message: "Kapasitas tidak boleh kosong." }),
  transmission: z.enum(["manual", "automatic"]),
  price: z.coerce.number().min(1, { message: "Harga tidak boleh kosong." }),
  imageUrl: z.string().url({ message: "URL gambar tidak valid." }),
  description: z.string().optional(),
  isAvailable: z.boolean(),
});

async function checkAdmin() {
    const session = await auth();
    // @ts-ignore
    if (!session?.user || session.user?.role !== 'admin') {
        throw new Error("Tidak diizinkan");
    }
    return session;
}

export async function createOrUpdateCar(values: z.infer<typeof CarSchema>) {
    await checkAdmin();
    const validatedFields = CarSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Input tidak valid!" };
    }

    if (!db) {
        return { error: "Koneksi database gagal." };
    }

    const { id, ...carData } = validatedFields.data;

    try {
        if (id) {
            // Update
            await db.update(cars).set(carData).where(eq(cars.id, id));
        } else {
            // Create
            await db.insert(cars).values(carData);
        }
        revalidatePath("/tanian/cars");
        revalidatePath("/cars");
        revalidatePath("/");
        return { success: `Mobil berhasil ${id ? 'diperbarui' : 'ditambahkan'}!` };
    } catch (error) {
        console.error(error);
        return { error: "Gagal menyimpan data mobil." };
    }
}

export async function deleteCar(id: string) {
    await checkAdmin();

    if (!db) {
        return { error: "Koneksi database gagal." };
    }

    try {
        await db.delete(cars).where(eq(cars.id, id));
        revalidatePath("/tanian/cars");
        revalidatePath("/cars");
        revalidatePath("/");
        return { success: "Mobil berhasil dihapus!" };
    } catch (error) {
        console.error(error);
        return { error: "Gagal menghapus mobil." };
    }
}
