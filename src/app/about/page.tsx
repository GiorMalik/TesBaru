import Image from "next/image";
import { Award, Target, Eye } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Tentang Gior<span className="text-primary">Bali</span>Tour
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Mitra perjalanan Anda yang terpercaya untuk menjelajahi keindahan Pulau Dewata.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-neon-green/20 shadow-lg">
             <Image 
                src="https://images.unsplash.com/photo-1518548435339-b94f6452834c?q=80&w=1974&auto=format&fit=crop"
                alt="Tim GiorBaliTour"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
             />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">Siapa Kami?</h2>
            <p className="text-gray-300 leading-relaxed">
              GiorBaliTour didirikan dengan satu tujuan sederhana: memberikan pengalaman liburan yang tak terlupakan di Bali melalui layanan sewa mobil yang mudah, aman, dan terpercaya. Kami memahami bahwa transportasi adalah kunci untuk menikmati setiap sudut pulau ini. Oleh karena itu, kami menyediakan paket lengkap 10 jam yang sudah termasuk mobil, supir profesional yang juga bisa menjadi pemandu wisata Anda, dan bensin. Anda tinggal duduk, santai, dan menikmati perjalanan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-800/50 p-8 rounded-lg border border-green-500/20">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Misi Kami</h3>
            <p className="text-gray-400">
              Menyediakan layanan transportasi yang unggul dengan mengutamakan keamanan, kenyamanan, dan kepuasan pelanggan.
            </p>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-lg border border-green-500/20 transform md:scale-105 shadow-neon-green/30">
             <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Komitmen Kami</h3>
            <p className="text-gray-400">
              Harga transparan tanpa biaya tersembunyi, armada mobil yang terawat, dan supir yang berpengalaman serta ramah.
            </p>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-lg border border-green-500/20">
            <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Visi Kami</h3>
            <p className="text-gray-400">
              Menjadi pilihan nomor satu untuk layanan sewa mobil bagi wisatawan domestik dan internasional di Bali.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
