import { pgTable, serial, text, varchar, pgEnum } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  email:varchar("email").notNull().unique(),
  uid:varchar("uid",{length:20}).notNull(),
  profilePic: varchar("profile_pic", { length: 150 }),
});