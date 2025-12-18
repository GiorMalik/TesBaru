import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-9xl font-extrabold text-primary">404</h2>
      <p className="text-2xl font-semibold mt-4 mb-2">Halaman Tidak Ditemukan</p>
      <p className="text-gray-400 mb-8">Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.</p>
      <Button asChild>
        <Link href="/">Kembali ke Beranda</Link>
      </Button>
    </div>
  )
}
