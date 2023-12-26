import { createId } from "@paralleldrive/cuid2";
import { text, timestamp } from "drizzle-orm/pg-core";
import { user } from ".";

/**
 *
 * @param name field name for the database if not provided defaults to "id"
 * @returns text field with a primary key, not null, and default value of createId
 *
 */
export function id(name?: string) {
  return text(name ?? "id")
    .primaryKey()
    .notNull()
    .$defaultFn(createId);
}

/**
 *
 * @param name field name for the database
 * @returns timestamp field with not null and default value of now
 */

export function timeStamp(name: string) {
  return timestamp(name).notNull().defaultNow();
}

export function userIdNullable(name?: string) {
  return text(name ?? "user_id").references(() => user.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  });
}

export function cascadedUserId(name?: string) {
  return text(name ?? "user_id").references(() => user.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  });
}
