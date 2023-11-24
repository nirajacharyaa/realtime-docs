import {
  pgTable,
  bigint,
  varchar,
  primaryKey,
  pgEnum,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { cascadedUserId, id, timeStamp } from "./utils";
import { enumRoleName } from "./enums";

export const user = pgTable("auth_user", {
  id: varchar("id", {
    length: 15, // change this when using custom user ids
  }).primaryKey(),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  email: varchar("email", {
    length: 255,
  })
    .notNull()
    .unique(),
  // other user attributes
});

export const session = pgTable("user_session", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});

export const role = pgTable("role", {
  id: id(),
  name: enumRoleName("name").notNull(),
});

export const key = pgTable("user_key", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
});

export const userRole = pgTable(
  "user_role",
  {
    userId: cascadedUserId(),
    roleId: varchar("role_id")
      .notNull()
      .references(() => role.id, { onDelete: "cascade", onUpdate: "cascade" }),
    createdAt: timeStamp("created_at"),
    updatedAt: timeStamp("updated_at"),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.userId, table.roleId],
      }),
    };
  }
);

export const selectAuthUser = createSelectSchema(user);
export const userIdSchema = selectAuthUser.pick({ id: true });

export type AuthUserType = z.infer<typeof selectAuthUser>;
export type UserId = z.infer<typeof userIdSchema>["id"];
