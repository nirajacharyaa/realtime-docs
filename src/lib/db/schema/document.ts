import {
  pgTable,
  varchar,
  boolean,
  jsonb,
  primaryKey,
} from "drizzle-orm/pg-core";
import { enumDocumentUserPermission } from "./enums";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { cascadedUserId, id, timeStamp, userIdNullable } from "./utils";

export const document = pgTable("document", {
  id: id(),
  title: varchar("title", {
    length: 255,
  }),
  content: jsonb("content"),
  userId: userIdNullable(),
  isPublic: boolean("is_public").default(false),
  createdAt: timeStamp("created_at"),
  updatedAt: timeStamp("updated_at"),
});

export const documentUser = pgTable(
  "document_user",
  {
    permission: enumDocumentUserPermission("permission").notNull(),
    userId: cascadedUserId(),
    documentId: varchar("document_id", {
      length: 15,
    }).references(() => document.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    createdAt: timeStamp("created_at"),
    updatedAt: timeStamp("updated_at"),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.userId, table.documentId],
      }),
    };
  }
);

export const insertDocumentSchema = createInsertSchema(document);
export const selectDocumentSchema = createSelectSchema(document);
export const documentIdSchema = selectDocumentSchema.pick({
  id: true,
});
export const updateDocumentSchema = selectDocumentSchema.partial().extend({
  id: z.string(),
  userId: z.string(),
});

export type DocumentId = z.infer<typeof documentIdSchema>["id"];
export type UpdateDocumentType = z.infer<typeof updateDocumentSchema>;
