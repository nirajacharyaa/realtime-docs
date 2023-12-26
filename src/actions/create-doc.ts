"use server";
import { db } from "@/lib/db";
import { document, insertDocumentSchema } from "@/lib/db/schema";
import { action } from "@/lib/safe-action";

export const createDoc = action(
  insertDocumentSchema,
  async ({ title, userId, isPublic }) => {
    console.log("createDoc", { title, userId, isPublic });
    const d = await db
      .insert(document)
      .values({
        title,
        userId,
        isPublic,
      })
      .returning()
      .then((r) => r[0]);
    return { doc: d };
  }
);
