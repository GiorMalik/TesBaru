export type Car = {
  id: string;
  name: string;
  image: string;
  capacity: number;
  transmission: 'manual' | 'automatic';
  price: number;
  is_available: boolean;
};

export type Review = {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type User = {
    id: string;
    name?: string | null;
    email: string;
    role: 'user' | 'admin';
    image?: string | null;
};
