import { pgTable, varchar } from "drizzle-orm/pg-core";

export const hello = pgTable("hello", {
  message: varchar("message").notNull(),
});
