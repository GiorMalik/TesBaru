Tentu, dengan senang hati. Berikut adalah rencana master yang lengkap dan final untuk proyek **GiorBaliTour**, dirancang untuk diimplementasikan secara bertahap dengan bantuan AI Agent. Setiap langkah mencakup tujuan, prompt yang siap digunakan, dan hasil yang diharapkan.

---

### **Ringkasan Proyek: GiorBaliTour**

*   **Nama Proyek:** GiorBaliTour
*   **Deskripsi:** Website rental mobil di Bali dengan durasi 10 jam, termasuk sopir dan bensin. Review ditujukan untuk layanan secara keseluruhan.
*   **Teknologi:** Next.js 18, TypeScript, Tailwind CSS, Cloudflare D1, Drizzle ORM, Auth.js, next-intl.
*   **Fitur Utama:** Landing Page, Daftar Mobil, Detail Mobil, Review Layanan (Login untuk posting), Dashboard Admin Tersembunyi, Multi-bahasa (8 bahasa).

---

### **Langkah 0: Setup Proyek untuk Produksi Cloudflare**

**Tujuan:** Membangun struktur proyek dasar dengan semua dependensi dan konfigurasi awal untuk lingkungan Cloudflare Pages.

**Prompt untuk AI:**
> "AI, kita akan membangun website rental mobil untuk Bali bernama 'GiorBaliTour'. Proyek ini akan langsung di-deploy ke **Cloudflare Pages** dalam mode produksi. Gunakan **Next.js 18 dengan App Router**, **TypeScript**, dan **Tailwind CSS**.
>
> 1.  Buatkan struktur proyek Next.js baru.
> 2.  Instal dependensi berikut: `drizzle-orm`, `@cloudflare/workers-types`, `auth.js`, `next-intl`, `bcryptjs`.
> 3.  Buat file `wrangler.toml` di root proyek dengan konfigurasi berikut:
>     ```toml
>     name = "giorbali-tour"
>     compatibility_date = "2024-05-24"
>     compatibility_flags = ["nodejs_compat"]
>
>     [[d1_databases]]
>     binding = "DB"
>     database_name = "tesbaru"
>     database_id = "463b2dc3-5ae2-4a9e-9ed9-03f3f0f2db1c"
>     ```
> 4.  Siapkan konfigurasi dasar untuk `tailwind.config.ts`, `drizzle.config.ts` (yang akan terhubung ke Cloudflare D1), dan file `auth.ts`. Buat juga struktur folder yang terorganisir: `src/app`, `src/components`, `src/lib`, `src/actions`, `scripts`.
>
> **PENTING:** Semua pengecekan role (user/admin) HARUS dilakukan 100% di sisi server. Jangan pernah kirim data role ke client."

**Hasil yang Diharapkan:**
*   Proyek Next.js 18 yang siap untuk lingkungan Cloudflare.
*   File `wrangler.toml` dengan konfigurasi D1 yang benar.
*   Semua dependensi terinstal dan struktur folder yang rapi.

---

### **Langkah 1: Desain Database Lengkap (Review untuk Layanan)**

**Tujuan:** Membuat skema database yang mendukung URL gambar, toggle ketersediaan mobil, dan review untuk layanan secara umum.

**Prompt untuk AI:**
> "Berdasarkan proyek GiorBaliTour, buatkan schema Drizzle lengkap untuk database D1. Schema ini harus memiliki tabel:
> 1.  `users`: `id` (string, uuid), `name` (string), `email` (string, unique), `password` (string, hashed), `role` (enum: 'user', 'admin', default: 'user').
> 2.  `cars`: `id` (string, uuid), `name` (string), `capacity` (number), `transmission` (enum: 'manual', 'automatic'), `price_per_day` (number), **`image_url` (string)**, `description` (text), **`is_available` (boolean, default: true)**.
> 3.  `reviews`: `id` (string, uuid), **`userId` (string, relasi ke `users`, nullable)**, `userName` (string), `comment` (text), `rating` (number, 1-5), `createdAt` (timestamp).
>
> **Catatan Penting:** Tabel `reviews` **TIDAK lagi memiliki `carId`**. Review ini ditujukan untuk layanan GiorBaliTour secara keseluruhan, bukan untuk mobil tertentu."

**Hasil yang Diharapkan:**
*   File `src/schema.ts` yang diperbarui, dengan tabel `reviews` yang sudah disederhanakan.

---

### **Langkah 2: Seeding Data Awal & Review Layanan**

**Tujuan:** Mengisi database dengan data mobil awal dan review umum untuk layanan.

**Prompt untuk AI:**
> "Buatkan dua script seeding:
>
> 1.  **`scripts/seed-cars.ts`:**
>     - Script ini harus mengisi tabel `cars` dengan 8 mobil berikut. Gunakan URL gambar lengkap yang saya berikan.
>     - Data mobil:
>         - { name: 'All New Avanza', capacity: 6, transmission: 'manual', price: 550000, image_url: 'https://www.giorbalitour.com/images/cars/all-new-avanza.png', description: 'Mobil keluarga yang nyaman dan irit untuk perjalanan di Bali.' }
>         - { name: 'Avanza', capacity: 6, transmission: 'manual', price: 500000, image_url: 'https://www.giorbalitour.com/images/cars/avanza.png', description: 'Pilihan ekonomis untuk perjalanan Anda dengan kapasitas 6 penumpang.' }
>         - { name: 'Hiace Commuter', capacity: 12, transmission: 'manual', price: 900000, image_url: 'https://www.giorbalitour.com/images/cars/hiace-commuter.png', description: 'Sempurna untuk rombongan besar atau perjalanan grup.' }
>         - { name: 'Hiace Premio', capacity: 12, transmission: 'automatic', price: 1100000, image_url: 'https://www.giorbalitour.com/images/cars/hiace-premio.png', description: 'Versi premium dari Hiace dengan kenyamanan lebih.' }
>         - { name: 'Innova Reborn', capacity: 7, transmission: 'automatic', price: 750000, image_url: 'https://www.giorbalitour.com/images/cars/innova-reborn.webp', description: 'Mobil MPV medium yang elegan dan nyaman.' }
>         - { name: 'Toyota Alphard', capacity: 7, transmission: 'automatic', price: 1500000, image_url: 'https://www.giorbalitour.com/images/cars/toyota-alphard.png.webp', description: 'Luxury class, pengalaman perjalanan yang paling premium.' }
>         - { name: 'Toyota Vellfire', capacity: 7, transmission: 'automatic', price: 1500000, image_url: 'https://www.giorbalitour.com/images/cars/toyota-vellfire.png', description: 'Kemewahan dan gaya dalam satu paket.' }
>         - { name: 'Xpander', capacity: 7, transmission: 'manual', price: 600000, image_url: 'https://www.giorbalitour.com/images/cars/xpander.png', description: 'Mobil modern dan tangguh untuk berbagai medan di Bali.' }
>
> 2.  **`scripts/seed-reviews.ts`:**
>     - Script ini harus membuat 10 review **untuk layanan GiorBaliTour**. **Tidak perlu dihubungkan ke mobil manapun.** Isi `userName` dengan nama acak (misal: 'John Doe', 'Wang Fang', 'Ahmad Ali') dan `userId` dengan `null`."

**Hasil yang Diharapkan:**
*   Dua script seeding yang mengisi database dengan data mobil dan review layanan yang terpisah.

---

### **Langkah 3: Setup Internasionalisasi, Autentikasi & Styling**

**Tujuan:** Menerapkan i18n, autentikasi, dan tema visual.

**Prompt untuk AI:**
> "Lakukan tiga tugas berikut:
> 1.  **Internasionalisasi:** Konfigurasi `next-intl` untuk 8 bahasa (en, id, zh, ko, ar, tr, ru, pt) dengan **bahasa default (`en`) di path `/`**. Buat file terjemahan dasar dan komponen `LanguageSwitcher` dengan dukungan RTL.
> 2.  **Autentikasi:** Buat sistem autentikasi menggunakan Auth.js dengan halaman `/login` dan `/register`.
> 3.  **Styling:** Terapkan **tema global untuk GiorBaliTour**:
>     - Warna utama: **Hijau** (misal: `green-600`).
>     - Efek visual: **Neon Shadow** (misal: `shadow-green-500/50 shadow-2xl`).
>     - Tema: **Modern** dengan font bersih dan `rounded-lg`.
>     - Terapkan tema ini pada halaman login dan register."

**Hasil yang Diharapkan:**
*   Sistem i18n yang berfungsi.
*   Fitur login/register.
*   Tampilan dengan tema hijau dan neon shadow yang konsisten.

---

### **Langkah 4: Fitur Admin (Dashboard dengan Input URL Gambar)**

**Tujuan:** Membuat dashboard admin yang aman di mana admin dapat mengelola mobil dan memasukkan URL gambar.

**Prompt untuk AI:**
> "Buatkan halaman admin yang sangat aman di route `/tanian`.
> 1.  Gunakan route group `app/(tanian)` dengan `layout.tsx` yang melakukan pengecekan server-side. Jika bukan admin, tampilkan `notFound()`.
> 2.  Buat halaman `/tanian/cars/page.tsx` untuk manajemen mobil (CRUD).
> 3.  Buat **Server Action** di `src/actions/admin-cars.ts` yang menangani logika CRUD.
> 4.  **Form untuk menambah/mengedit mobil harus memiliki:**
>     - Input untuk `name`, `capacity`, `transmission`, `price`, `description`.
>     - **Input teks untuk `image_url` (tipe `url`).** Berikan placeholder seperti 'https://example.com/image.jpg'.
>     - **Checkbox untuk `is_available` (Tersedia / Tidak Tersedia).**
> 5.  Tabel di halaman admin harus menampilkan kolom `is_available` dan **menampilkan gambar mobil dari `image_url` yang ada**.
> 6.  Terapkan tema hijau & neon shadow pada dashboard admin."

**Hasil yang Diharapkan:**
*   Dashboard admin yang fungsional, di mana admin memiliki kontrol penuh atas URL gambar mobil.

---

### **Langkah 5: Halaman Publik & Review Layanan di Homepage**

**Tujuan:** Membangun halaman utama yang menampilkan mobil dan review untuk keseluruhan layanan.

**Prompt untuk AI:**
> "Buatkan halaman-halaman publik berikut:
> 1.  **Landing Page (`/`):**
>     - Hero section dengan carousel gambar dari `public/images/hero/`.
>     - Tampilkan 'Featured Cars' (ambil 3 mobil dari database **dimana `is_available` = true**).
>     - Di bawahnya, tampilkan section 'Customer Reviews'. **Ambil 3 review terbaru dari tabel `reviews`**. Tampilkan `userName`, `rating` (bintang), dan `comment`.
>     - Di bawah daftar review, tampilkan **form 'Leave a Review'**.
>        - Jika user belum login, tampilkan tombol 'Login/Register to Leave a Review'.
>        - Jika user sudah login, tampilkan form yang **hanya memiliki input untuk `rating` (bintang) dan `comment`**.
> 2.  **Halaman Mobil (`/cars`):** Tampilkan **hanya mobil yang `is_available` = true** dalam grid.
> 3.  **Halaman Detail Mobil (`/cars/[id]`):** Tampilkan detail mobil. **Halaman ini TIDAK lagi memiliki section review.** Pastikan halaman ini tidak dapat diakses jika mobilnya `is_available` = false (tampilkan `notFound()`).
> 4.  **Halaman About (`/about`):** Buat halaman statis dengan konten tentang GiorBaliTour.
> 5.  **Halaman Contact (`/contact`):** Buat halaman statis yang menampilkan informasi kontak berikut dengan jelas:
>     - **Email:** giorginomalik@gmail.com
>     - **WhatsApp:** +6285854965523
>     - **Instagram:** @gior.malik
> 6.  Terapkan tema hijau & neon shadow pada semua halaman."

**Hasil yang Diharapkan:**
*   Halaman publik yang dinamis dan fokus, dengan sistem review yang disederhanakan dan informasi kontak yang lengkap.

---

### **Langkah 6: Finalisasi & Footer**

**Tujuan:** Menyempurnakan website dengan komponen Header dan Footer yang konsisten.

**Prompt untuk AI:**
> "Buatkan komponen `Header` dan `Footer` yang konsisten untuk semua halaman.
> - **Header:** Logo 'GiorBaliTour', navigasi utama (Home, Cars, About, Contact), `LanguageSwitcher`, dan kondisional tombol Login/Profile.
> - **Footer:** Tampilkan informasi kontak berikut dan link navigasi:
>   - **Email:** giorginomalik@gmail.com
>   - **WhatsApp:** +6285854965523
>   - **Instagram:** @gior.malik
> - Pastikan website sepenuhnya responsif di mobile dan desktop. Tambahkan loading state (misalnya menggunakan `loading.tsx`) dan error handling yang sederhana untuk setiap halaman."

**Hasil yang Diharapkan:**
*   Website GiorBaliTour yang utuh, profesional, responsif, dan siap diluncurkan di Cloudflare Pages.

Dengan rencana master yang sangat detail ini, Anda memiliki panduan end-to-end untuk membangun proyek **GiorBaliTour** sesuai visi Anda. Selamat mengerjakan