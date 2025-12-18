"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions";

const LoginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid." }),
  password: z.string().min(1, { message: "Password tidak boleh kosong." }),
});

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
      });
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <Card className="w-full max-w-md mx-auto bg-gray-800/50 border-green-500/20 shadow-neon-green/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white">Login</CardTitle>
          <CardDescription>Selamat datang kembali! Silakan masuk.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@anda.com"
                {...form.register("email")}
                disabled={isPending}
                className="bg-gray-900"
              />
              {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                {...form.register("password")}
                disabled={isPending}
                className="bg-gray-900"
              />
               {form.formState.errors.password && <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>}
            </div>
             {error && <p className="text-sm text-red-500 bg-red-500/10 p-3 rounded-md">{error}</p>}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Memproses..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Belum punya akun?{" "}
            <Link href="/register" className="underline hover:text-primary">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
