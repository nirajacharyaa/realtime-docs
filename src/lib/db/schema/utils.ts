import { createId } from "@paralleldrive/cuid2";
import { text, timestamp } from "drizzle-orm/pg-core";
import { user } from ".";

export function id(name?: string) {
  return text(name ?? "id")
    .primaryKey()
    .notNull()
    .$defaultFn(createId);
}

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
