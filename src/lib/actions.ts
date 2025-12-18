'use server';

import { signIn, signOut, auth } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// --- Auth Actions ---

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
    return 'Success';
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

// In a real app, you would add logic to create a new user in your database.
const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
    const validatedFields = RegisterSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
      return 'Invalid fields.';
    }

    // This is a dummy registration. In a real app, you would hash the password
    // and save the user to your database.
    console.log('Registering user:', validatedFields.data.email);

    try {
        await signIn('credentials', formData);
        return 'Success';
    } catch (error) {
        if (error instanceof AuthError) {
            return 'Registration failed. Please try again.';
        }
        throw error;
    }
}

export async function doSignOut() {
    await signOut();
}

// --- Review Actions ---
export async function addReview(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user) {
        return { message: 'Authentication required.' };
    }
    // Dummy action
    console.log('Adding review:', formData.get('rating'), formData.get('comment'));
    revalidatePath('/reviews');
    return { message: 'Review added successfully!' };
}

// --- Admin Car Actions ---
const CarSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  image: z.string().url("Must be a valid URL"),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
  transmission: z.enum(['manual', 'automatic']),
  price: z.coerce.number().min(1, "Price must be at least 1"),
  is_available: z.preprocess((val) => val === 'on' || val === true, z.boolean()),
});


export async function saveCar(prevState: any, formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== 'admin') {
      return { success: false, message: 'Unauthorized.' };
  }

  const validatedFields = CarSchema.safeParse(Object.fromEntries(formData));
  if (!validatedFields.success) {
      return { success: false, message: 'Invalid data.', errors: validatedFields.error.flatten().fieldErrors };
  }

  const { id, ...carData } = validatedFields.data;

  if (id) {
    // Update car
    console.log(`Updating car ${id}:`, carData);
  } else {
    // Create new car
    console.log('Creating new car:', carData);
  }
  
  revalidatePath('/tanian');
  return { success: true, message: `Car ${id ? 'updated' : 'created'} successfully.` };
}

export async function deleteCar(id: string) {
    const session = await auth();
    if (session?.user?.role !== 'admin') {
        return { success: false, message: 'Unauthorized.' };
    }
    
    // Dummy delete
    console.log(`Deleting car ${id}`);
    
    revalidatePath('/tanian');
    return { success: true, message: 'Car deleted successfully.' };
}
