"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserButton } from "./user-button";

export function Header() {
  const { data: session } = useSession();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/cars", label: "Daftar Mobil" },
    { href: "/about", label: "Tentang Kami" },
    { href: "/contact", label: "Kontak" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm shadow-md shadow-green-500/10">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-bold text-white">
          Gior<span className="text-primary">Bali</span>Tour
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-300 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <UserButton session={session} />
        </div>
      </div>
    </header>
  );
}