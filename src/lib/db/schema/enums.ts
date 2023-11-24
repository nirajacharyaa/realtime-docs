import { pgEnum } from "drizzle-orm/pg-core";

export const enumRoleName = pgEnum("user_role_name", ["SUPER_ADMIN", "ADMIN"]);
export const enumDocumentUserPermission = pgEnum("document_user_permission", [
  "EDIT",
  "VIEW",
]);
