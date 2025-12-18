"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-destructive mb-4">Terjadi Kesalahan!</h2>
      <p className="text-gray-400 mb-8">Maaf, sepertinya ada yang tidak beres.</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Coba Lagi
      </Button>
    </div>
  );
}
