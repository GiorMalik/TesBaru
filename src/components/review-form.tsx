"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitReview } from "@/lib/actions";
import { useState, useTransition } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const ReviewFormSchema = z.object({
  comment: z.string().min(10, { message: "Komentar minimal 10 karakter." }),
  rating: z.coerce.number().min(1, "Rating harus diisi").max(5),
});

function StarRatingInput({ field }: { field: any }) {
    const [hover, setHover] = useState(0);
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <label key={ratingValue}>
              <input type="radio" {...field} value={ratingValue} className="hidden" />
              <svg
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
                className={`w-6 h-6 cursor-pointer transition-colors ${
                  ratingValue <= (hover || field.value)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-500"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.44 9.101c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </label>
          );
        })}
      </div>
    );
}

export function ReviewForm() {
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ReviewFormSchema>>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: { comment: "", rating: 0 },
  });

  const onSubmit = (values: z.infer<typeof ReviewFormSchema>) => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      if (!session?.user?.id || !session?.user?.name) return;
      const result = await submitReview({ ...values, userId: session.user.id, userName: session.user.name });
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(result.success ?? "Ulasan berhasil dikirim!");
        form.reset();
      }
    });
  };

  if (status === "loading") {
    return (
        <Card className="w-full max-w-2xl mx-auto bg-gray-800/50 border-green-500/20">
            <CardHeader><CardTitle>Memuat...</CardTitle></CardHeader>
        </Card>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-gray-800/50 border-green-500/20 text-center">
        <CardHeader>
          <CardTitle>Tinggalkan Ulasan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Anda harus login untuk memberikan ulasan tentang layanan kami.</p>
          <Button asChild>
            <Link href="/login">Login / Register untuk Memberi Ulasan</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-800/50 border-green-500/20">
      <CardHeader>
        <CardTitle>Bagaimana Pengalaman Anda?</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label>Rating</Label>
            {form.register("rating") && <StarRatingInput field={form.register("rating")} />}
            {form.formState.errors.rating && <p className="text-red-500 text-sm">{form.formState.errors.rating.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Komentar Anda</Label>
            <Textarea
              id="comment"
              placeholder="Ceritakan pengalaman Anda dengan layanan kami..."
              {...form.register("comment")}
              className="bg-gray-900"
            />
             {form.formState.errors.comment && <p className="text-red-500 text-sm">{form.formState.errors.comment.message}</p>}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Mengirim..." : "Kirim Ulasan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
