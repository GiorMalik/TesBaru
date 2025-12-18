import { drizzle } from 'drizzle-orm/d1';
import { getRequestContext } from '@cloudflare/next-on-pages';
import * as schema from './schema';

// Menghindari error saat build karena getRequestContext hanya ada di environment Pages
let d1;
if (typeof getRequestContext === 'function') {
  try {
    // @ts-ignore
    d1 = getRequestContext().env.DB;
  } catch (e) {
    console.error('Gagal mendapatkan D1 context:', e);
  }
} else if (process.env.NODE_ENV === 'development') {
    console.log('Bukan di lingkungan Cloudflare Pages, D1 context tidak tersedia.');
}


// @ts-ignore
export const db = d1 ? drizzle(d1, { schema }) : null;
