import { pgTable, serial, text, timestamp, boolean, primaryKey, integer } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// Waitlist Table: Stores email submissions from the coming-soon page.
// The email column has a unique constraint to prevent duplicate subscriptions.
export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  status: text("status").notNull().default("subscribed"), // 'subscribed', 'unsubscribed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Auth.js Users Table: Managed by the auth provider.
export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
});

// Auth.js Accounts Table: Links OAuth accounts (Google) to users.
export const accounts = pgTable("account", {
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<AdapterAccountType>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
}, (account) => ({
  compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
}));

// Auth.js Verification Tokens Table: Used for passwordless magic links.
export const verificationTokens = pgTable("verificationToken", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
}, (verificationToken) => ({
  compositePk: primaryKey({ columns: [verificationToken.identifier, verificationToken.token] }),
}));