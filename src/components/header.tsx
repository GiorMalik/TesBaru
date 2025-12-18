import Link from "next/link";
import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";

async function UserButton() {
  const session = await auth();
  if (!session?.user) {
    return (
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="hidden sm:inline">
        Halo, {session.user.name?.split(" ")[0]}
      </span>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant="outline" type="submit">
          Logout
        </Button>
      </form>
       {/* @ts-ignore */}
      {session.user.role === 'admin' && (
        <Button asChild variant="secondary">
          <Link href="/tanian/cars">Dashboard</Link>
        </Button>
      )}
    </div>
  );
}


export function Header() {
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
          <UserButton />
        </div>
      </div>
    </header>
  );
}
