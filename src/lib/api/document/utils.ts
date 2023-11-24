import { db } from "@/lib/db";
import { DocumentId, UserId } from "@/lib/db/schema";

export const hasRight = async (userId: UserId, documentId: DocumentId) => {
  const doc = await db.query.document.findFirst({
    where: (document, { eq, and, or }) =>
      or(
        and(eq(document.id, documentId), eq(document.userId, userId)),
        and(eq(document.id, documentId), eq(document.isPublic, true))
      ),
  });

  return doc?.id === documentId;
};
