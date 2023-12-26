import { Session, lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { pg } from "@lucia-auth/adapter-postgresql";
import { db } from "@vercel/postgres";
import { cache } from "react";
import * as context from "next/headers";

import * as dotenv from "dotenv";
dotenv.config({
  path: ".env.local",
});

export const auth = lucia({
  adapter: pg(db, {
    user: "auth_user",
    key: "user_key",
    session: "user_session",
  }),
  env: process.env.NODE_ENV === "production" ? "PROD" : "DEV",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (data) => {
    return {
      name: data.name,
      email: data.email,
      id: data.id,
    };
  },
});

export type Auth = typeof auth;

export const getPageSession = cache((): Promise<Session | null> => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});
