import { db } from "@/lib/db";
import { DocumentId, UserId } from "@/lib/db/schema";

export const getDocument = async (documentId: DocumentId) => {
  const doc = await db.query.document.findFirst({
    where: (document, { eq }) => eq(document.id, documentId),
  });
  return doc;
};

export const getAllDocuments = async (userId: UserId) => {
  const userDocs = await db.query.document.findMany({
    where: (document, { eq }) => eq(document.userId, userId),
  });

  const sharedDocsIds = await db.query.document
    .findMany({
      where: (document, { eq }) => eq(document.userId, userId),
    })
    .then((docs) => docs.map((doc) => doc.id));

  const sharedDocs = await db.query.document.findMany({
    where: (document, { inArray }) => inArray(document.id, sharedDocsIds),
  });

  return {
    docs: {
      ...userDocs,
      ...sharedDocs,
    },
  };
};
