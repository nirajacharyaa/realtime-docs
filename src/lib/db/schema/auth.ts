import {
  pgTable,
  bigint,
  varchar,
  primaryKey,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

export const enumRoleName = pgEnum("user_role_name", ["SUPER_ADMIN", "ADMIN"]);
export const enumDocumentUserPermission = pgEnum("document_user_permission", [
  "EDIT",
  "VIEW",
]);

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
  id: varchar("id", {
    length: 15,
  }).primaryKey(),
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
    userId: varchar("user_id", {
      length: 15,
    })
      .notNull()
      .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
    roleId: varchar("role_id")
      .notNull()
      .references(() => role.id, { onDelete: "cascade", onUpdate: "cascade" }),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.userId, table.roleId],
      }),
    };
  }
);
