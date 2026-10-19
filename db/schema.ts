import { pgTable, serial, text, timestamp, boolean, primaryKey, integer } from "drizzle-orm/pg-core";

// Waitlist Table
export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  status: text("status").notNull().default("subscribed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Return Plans Table
export const returnPlans = pgTable("return_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  currentLocation: text("current_location").notNull(),
  cambodiaConnection: text("cambodia_connection").notNull(),
  plannedArrivalDate: text("planned_arrival_date"), // NEW FIELD ADDED
  durationMonths: text("duration_months"),
  plansDescription: text("plans_description").notNull(),
  interests: text("interests"), 
  biggestConcern: text("biggest_concern"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Auth.js Users Table
export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
});

// Auth.js Accounts Table
export const accounts = pgTable("account", {
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
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

// Auth.js Verification Tokens Table
export const verificationTokens = pgTable("verificationToken", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
}, (verificationToken) => ({
  compositePk: primaryKey({ columns: [verificationToken.identifier, verificationToken.token] }),
}));