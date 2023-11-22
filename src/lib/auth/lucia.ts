import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { pg } from "@lucia-auth/adapter-postgresql";
import { db } from "@vercel/postgres";
import { env } from "../env.mjs";

export const auth = lucia({
  env: env.NODE_ENV === "production" ? "PROD" : "DEV",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  adapter: pg(db, {
    user: "auth_user",
    key: "user_key",
    session: "user_session",
  }),

  getUserAttributes: (data) => {
    return {
      name: data.name,
      email: data.email,
      id: data.id,
    };
  },
});

export type Auth = typeof auth;
