import { drizzle } from 'drizzle-orm/d1';
import { createD1 } from 'drizzle-orm/d1/migrator';
import { users, cars, reviews } from '../src/lib/db/schema';
import bcrypt from 'bcryptjs';

async function main() {
    console.log('Seeding database...');
    // This is a workaround to get the D1 binding in a script
    // In a real CF Worker/Pages environment, you'd use getRequestContext()
    // @ts-ignore
    const d1 = createD1(process.env.DB);
    const db = drizzle(d1);

    // Clear existing data
    console.log('Clearing existing data...');
    await db.delete(reviews).run();
    await db.delete(cars).run();
    await db.delete(users).run();

    // Seed users
    console.log('Seeding users...');
    const hashedPassword = await bcrypt.hash('123456', 10);
    const adminUser = await db.insert(users).values({
        name: 'Admin',
        email: 'admin@giorbalitour.com',
        password: hashedPassword,
        role: 'admin',
    }).returning();
    
    console.log('Admin user created:', adminUser[0]);

    const regularUser = await db.insert(users).values({
        name: 'Tatang',
        email: 'tatang@example.com',
        password: hashedPassword,
        role: 'user',
    }).returning();
    console.log('Regular user created:', regularUser[0]);


    // Seed cars
    console.log('Seeding cars...');
    const carData = [
        { name: 'All New Avanza', capacity: 6, transmission: 'manual', price: 550000, imageUrl: 'https://www.giorbalitour.com/images/cars/all-new-avanza.png', description: 'Mobil keluarga yang nyaman dan irit untuk perjalanan di Bali.' },
        { name: 'Avanza', capacity: 6, transmission: 'manual', price: 500000, imageUrl: 'https://www.giorbalitour.com/images/cars/avanza.png', description: 'Pilihan ekonomis untuk perjalanan Anda dengan kapasitas 6 penumpang.' },
        { name: 'Hiace Commuter', capacity: 12, transmission: 'manual', price: 900000, imageUrl: 'https://www.giorbalitour.com/images/cars/hiace-commuter.png', description: 'Sempurna untuk rombongan besar atau perjalanan grup.' },
        { name: 'Hiace Premio', capacity: 12, transmission: 'automatic', price: 1100000, imageUrl: 'https://www.giorbalitour.com/images/cars/hiace-premio.png', description: 'Versi premium dari Hiace dengan kenyamanan lebih.' },
        { name: 'Innova Reborn', capacity: 7, transmission: 'automatic', price: 750000, imageUrl: 'https://www.giorbalitour.com/images/cars/innova-reborn.webp', description: 'Mobil MPV medium yang elegan dan nyaman.' },
        { name: 'Toyota Alphard', capacity: 7, transmission: 'automatic', price: 1500000, imageUrl: 'https://www.giorbalitour.com/images/cars/toyota-alphard.png.webp', description: 'Luxury class, pengalaman perjalanan yang paling premium.' },
        { name: 'Toyota Vellfire', capacity: 7, transmission: 'automatic', price: 1500000, imageUrl: 'https://www.giorbalitour.com/images/cars/toyota-vellfire.png', description: 'Kemewahan dan gaya dalam satu paket.' },
        { name: 'Xpander', capacity: 7, transmission: 'manual', price: 600000, imageUrl: 'https://www.giorbalitour.com/images/cars/xpander.png', description: 'Mobil modern dan tangguh untuk berbagai medan di Bali.' }
    ];
    await db.insert(cars).values(carData).run();
    console.log('Cars seeded.');

    // Seed reviews
    console.log('Seeding reviews...');
    const reviewData = [
        { userName: 'John Doe', comment: 'Pelayanan sangat memuaskan, supir ramah dan tahu banyak tempat bagus!', rating: 5 },
        { userName: 'Ahmad Ali', comment: 'Mobil bersih dan nyaman. Perjalanan jadi menyenangkan.', rating: 5, userId: regularUser[0].id },
        { userName: 'Wang Fang', comment: 'Harga terjangkau dengan kualitas yang baik. Recommended!', rating: 4 },
        { userName: 'Siti Aminah', comment: 'Proses booking mudah dan cepat. Respon admin juga sangat baik.', rating: 5 },
        { userName: 'David Chen', comment: 'Sangat membantu selama liburan di Bali. Terima kasih GiorBaliTour!', rating: 5 },
        { userName: 'Maria Garcia', comment: 'Sedikit terlambat saat penjemputan, tapi secara keseluruhan oke.', rating: 3 },
        { userName: 'Alex Ivanov', comment: 'Great service, clean car, and friendly driver. Will use again!', rating: 5 },
        { userName: 'Yuki Tanaka', comment: 'Driver was very knowledgeable about the local culture. Very insightful trip.', rating: 5 },
        { userName: 'Budi Santoso', comment: 'Harga sewa 10 jam sudah termasuk semuanya, jadi tidak ada biaya tak terduga.', rating: 4 },
        { userName: 'Fatima Al-Jamil', comment: 'Excellent and professional service. Made our family trip much easier.', rating: 5 },
    ];
    await db.insert(reviews).values(reviewData).run();
    console.log('Reviews seeded.');

    console.log('Database seeding finished.');
}

main().catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
});
