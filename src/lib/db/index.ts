
import { drizzle } from 'drizzle-orm/d1';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import Database from 'better-sqlite3';

// A function to get the D1 database instance (only for production on Cloudflare)
function getD1Database() {
  try {
    const { getRequestContext } = require('@cloudflare/next-on-pages');
    // @ts-ignore - The type for getRequestContext().env might not be perfectly known
    const d1 = getRequestContext().env.DB;
    return drizzle(d1, { schema });
  } catch (e) {
    if (e instanceof Error && e.code === 'MODULE_NOT_FOUND') {
      // This is expected when not in the Cloudflare environment
      return null;
    } 
    console.error("Failed to get D1 database:", e);
    return null;
  }
}

// A function to get the local SQLite database instance (for development)
function getLocalDatabase() {
  console.log("Initializing local SQLite database...");
  const sqlite = new Database('sqlite.db');
  return drizzleSqlite(sqlite, { schema });
}

// Determine which database to use
// If we are in production, try to use D1. Otherwise, use local SQLite.
// The `||` operator provides a fallback: if getD1Database() returns null, getLocalDatabase() is called.
export const db = process.env.NODE_ENV === 'production' 
  ? getD1Database() || getLocalDatabase() 
  : getLocalDatabase();


// A safety check for the authentication adapter
// In a local environment, db should always be the SQLite instance.
// In production, it should be the D1 instance.
// This ensures that DrizzleAdapter doesn't receive a null object.
if (!db && process.env.NODE_ENV === 'development') {
    throw new Error("Database connection could not be established in development.");
}
