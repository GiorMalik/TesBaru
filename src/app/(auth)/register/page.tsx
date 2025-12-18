"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/lib/actions";

const RegisterSchema = z.object({
  email: z.string().email({ message: "Email tidak valid." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
  name: z.string().min(1, { message: "Nama tidak boleh kosong." }),
});

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        if (data.success) {
          setSuccess(data.success);
          setTimeout(() => router.push("/login"), 2000);
        }
      });
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <Card className="w-full max-w-md mx-auto bg-gray-800/50 border-green-500/20 shadow-neon-green/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white">Register</CardTitle>
          <CardDescription>Buat akun baru untuk memulai.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" {...form.register("name")} disabled={isPending} className="bg-gray-900" />
              {form.formState.errors.name && <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register("email")} disabled={isPending} className="bg-gray-900" />
              {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...form.register("password")} disabled={isPending} className="bg-gray-900" />
              {form.formState.errors.password && <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>}
            </div>
            {error && <p className="text-sm text-red-500 bg-red-500/10 p-3 rounded-md">{error}</p>}
            {success && <p className="text-sm text-green-500 bg-green-500/10 p-3 rounded-md">{success}</p>}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Membuat Akun..." : "Register"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Sudah punya akun?{" "}
            <Link href="/login" className="underline hover:text-primary">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
