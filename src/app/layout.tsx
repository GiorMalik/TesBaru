import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GiorBaliTour",
  description: "Website rental mobil di Bali",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Menghapus params.locale untuk sementara karena next-intl dihapus
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
