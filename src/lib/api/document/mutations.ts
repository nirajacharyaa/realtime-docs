import { db } from "@/lib/db";
import {
  DocumentId,
  UpdateDocumentType,
  UserId,
  document,
} from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { hasRight } from "./utils";

export const createDocument = async (userId: UserId) => {
  const [doc] = await db
    .insert(document)
    .values({
      userId,
    })
    .returning();
  return {
    doc,
  };
};

export const updateDocument = async (data: UpdateDocumentType) => {
  const permission = await hasRight(data.userId, data.id);
  const [doc] = await db
    .update(document)
    .set(data)
    .where(eq(document.id, data.id))
    .returning();
  return doc;
};

export const deleteDocument = async (
  userId: UserId,
  documentId: DocumentId
) => {
  await db
    .delete(document)
    .where(and(eq(document.userId, userId), eq(document.id, documentId)))
    .returning();
};
