import { pgTable, serial, text, varchar, pgEnum } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }),
  about: varchar("about", { length: 250 }),
  profilePic: varchar("profile_pic", { length: 150 }),
});