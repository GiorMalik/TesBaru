import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GiorBaliTour",
  description: "Website rental mobil di Bali dengan durasi 10 jam, termasuk sopir dan bensin.",
  keywords: "rental mobil bali, sewa mobil bali, giorbali tour, bali car rental"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <SessionProvider session={session}>
          <Header />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}