
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { join } from 'path';

// This script is used to run database migrations.
// It is not part of the application runtime.

console.log("Starting migration script...");

// Ensure the path to the database is correct
const dbPath = join(process.cwd(), 'sqlite.db');
console.log(`Database path: ${dbPath}`);

const sqlite = new Database(dbPath);
const db = drizzle(sqlite);

// This will run migrations on the database, skipping the ones already applied
try {
  migrate(db, { migrationsFolder: 'drizzle' });
  console.log("Migrations applied successfully!");
} catch (error) {
  console.error("Error applying migrations:", error);
  process.exit(1);
}

// Don't forget to close the connection, otherwise the script will hang
sqlite.close();
console.log("Migration script finished.");
process.exit(0);
