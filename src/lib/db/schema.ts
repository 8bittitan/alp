import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  username: text("username").unique(),
  hashedPassword: text("hashed_password"),
});

export const session = pgTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
});

export const links = pgTable("links", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  domain: text("domain").notNull(),
  key: text("key").notNull(),
  url: text("url").notNull(),
  clicks: integer("clicks").notNull().default(0),
  createdAt: timestamp("created_at").default(new Date()).notNull(),
  // [todo) Add indexes
});
