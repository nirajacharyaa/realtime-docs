import {
  pgTable,
  varchar,
  boolean,
  jsonb,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";
import { enumDocumentUserPermission, user } from ".";

export const document = pgTable("document", {
  id: varchar("id", {
    length: 15,
  }).primaryKey(),
  title: varchar("title", {
    length: 255,
  }).notNull(),
  content: jsonb("content"),
  useId: varchar("user_id").references(() => user.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const documentUser = pgTable(
  "document_user",
  {
    permission: enumDocumentUserPermission("permission").notNull(),
    userId: varchar("user_id", {
      length: 15,
    })
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    documentId: varchar("document_id", {
      length: 15,
    }).references(() => document.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
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
        columns: [table.userId, table.documentId],
      }),
    };
  }
);
