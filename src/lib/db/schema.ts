import { integer, text, sqliteTable, primaryKey, real } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

// --- APPLICATION-SPECIFIC SCHEMA --- //
export const users = sqliteTable("user", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  password: text("password"),
  role: text("role", { enum: ["user", "admin"] }).default("user"),
});

export const cars = sqliteTable("cars", {
    id: text("id").$defaultFn(() => createId()).primaryKey(),
    name: text('name').notNull(),
    capacity: integer('capacity').notNull(),
    transmission: text('transmission', { enum: ['manual', 'automatic'] }).notNull(),
    price: integer('price').notNull(),
    imageUrl: text('imageUrl').notNull(),
    description: text('description'),
    isAvailable: integer('isAvailable', { mode: 'boolean' }).notNull().default(true),
});

export const reviews = sqliteTable("reviews", {
    id: text("id").$defaultFn(() => createId()).primaryKey(),
    userId: text("userId").references(() => users.id, { onDelete: 'set null' }),
    userName: text("userName").notNull(),
    comment: text("comment").notNull(),
    rating: real("rating").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
