import { db } from "@/lib/db";

export const findUserByEmail = async (email: string) => {
  const user = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });
  return user;
};
