
import { type Config } from 'drizzle-kit';

export default {
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'better-sqlite', // Corrected from 'better-sqlite3'
  dbCredentials: {
    url: './sqlite.db', // Path to your local database file
  },
  verbose: true,
  strict: true,
} satisfies Config;
