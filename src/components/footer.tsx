import Link from "next/link";
import { Mail, Phone, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-green-500/20 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-6 text-gray-300">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Gior<span className="text-primary">Bali</span>Tour</h3>
          <p className="text-sm text-gray-400">
            Layanan rental mobil terbaik di Bali. Nikmati perjalanan Anda dengan nyaman dan aman bersama kami.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Navigasi</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/cars" className="hover:text-primary transition-colors">Daftar Mobil</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">Tentang Kami</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Kontak</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Hubungi Kami</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:giorginomalik@gmail.com" className="hover:text-primary transition-colors">giorginomalik@gmail.com</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary" />
              <a href="https://wa.me/6285854965523" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">+62 858-5496-5523</a>
            </li>
            <li className="flex items-center gap-3">
              <Instagram className="w-4 h-4 text-primary" />
              <a href="https://www.instagram.com/gior.malik" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@gior.malik</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} GiorBaliTour. All rights reserved.</p>
      </div>
    </footer>
  );
}
