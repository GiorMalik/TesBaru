import { Car, Review } from './definitions';
import { PlaceHolderImages } from './placeholder-images';
import type { User } from 'next-auth';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const cars: Car[] = [
  { id: '1', name: 'Toyota Avanza', image: getImage('car1'), capacity: 7, transmission: 'manual', price: 40, is_available: true },
  { id: '2', name: 'Honda Brio', image: getImage('car2'), capacity: 4, transmission: 'automatic', price: 35, is_available: true },
  { id: '3', name: 'Suzuki Ertiga', image: getImage('car3'), capacity: 7, transmission: 'manual', price: 45, is_available: false },
  { id: '4', name: 'Daihatsu Xenia', image: getImage('car4'), capacity: 7, transmission: 'automatic', price: 42, is_available: true },
  { id: '5', name: 'Mitsubishi Xpander', image: getImage('car5'), capacity: 7, transmission: 'automatic', price: 50, is_available: true },
  { id: '6', name: 'Wuling Air EV', image: getImage('car6'), capacity: 4, transmission: 'automatic', price: 60, is_available: true },
  { id: '7', name: 'Toyota Raize', image: getImage('car7'), capacity: 5, transmission: 'automatic', price: 55, is_available: false },
];

export const reviews: Review[] = [
  { id: '1', userName: 'John Doe', userImage: getImage('user1'), rating: 5, comment: 'Amazing service! The car was clean and the process was seamless. Highly recommended!', createdAt: '2023-10-15' },
  { id: '2', userName: 'Jane Smith', userImage: getImage('user2'), rating: 4, comment: 'Good selection of cars. The one I got was in great condition. The staff was very helpful.', createdAt: '2023-10-12' },
  { id: '3', userName: 'Alex Johnson', userImage: getImage('user3'), rating: 5, comment: 'Flawless experience from booking to return. Will definitely use GiorBaliTour again on my next trip!', createdAt: '2023-10-10' },
];

// Dummy users for authentication. In a real app, this would be a database.
// Passwords are "password123"
export const users: (User & { passwordHash: string })[] = [
  { id: '1', name: 'Admin User', email: 'admin@giorbali.tour', role: 'admin', passwordHash: '$2a$10$wAxL2jL95JdENp8kzz1.a.jF.n5SoiHwHxwYk2u6s4.WzU7fSk33K' },
  { id: '2', name: 'Customer User', email: 'user@giorbali.tour', role: 'user', passwordHash: '$2a$10$wAxL2jL95JdENp8kzz1.a.jF.n5SoiHwHxwYk2u6s4.WzU7fSk33K' },
];
