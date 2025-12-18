"use server";

import { z } from "zod";
import { db } from "./db";
import { users, reviews } from "./db/schema";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { revalidatePath } from "next/cache";

const RegisterSchema = z.object({
  email: z.string().email({ message: "Email tidak valid." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
  name: z.string().min(1, { message: "Nama tidak boleh kosong." }),
});

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Input tidak valid!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!db) {
    return { error: "Koneksi database gagal." };
  }

  try {
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return { error: "Email sudah digunakan." };
  }

  return { success: "Registrasi berhasil!" };
}

export async function login(values: z.infer<typeof z.object({ email: z.string().email(), password: z.string().min(1) })>) {
    const validatedFields = z.object({ email: z.string().email(), password: z.string().min(1) }).safeParse(values);

    if (!validatedFields.success) {
        return { error: "Input tidak valid!" };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Email atau password salah." };
                default:
                    return { error: "Terjadi kesalahan." };
            }
        }
        throw error;
    }
    return { success: "Login berhasil!" };
}


const ReviewSchema = z.object({
  comment: z.string().min(10, { message: "Komentar minimal 10 karakter." }),
  rating: z.coerce.number().min(1).max(5),
  userId: z.string(),
  userName: z.string(),
});

export async function submitReview(values: z.infer<typeof ReviewSchema>) {
  const validatedFields = ReviewSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return { error: "Input tidak valid!" };
  }

  if (!db) {
    return { error: "Koneksi database gagal." };
  }

  try {
    await db.insert(reviews).values(validatedFields.data);
    revalidatePath("/");
    return { success: "Ulasan berhasil dikirim!" };
  } catch (error) {
    console.error(error);
    return { error: "Gagal mengirim ulasan." };
  }
}
