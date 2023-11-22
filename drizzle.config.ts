import type { Config } from "drizzle-kit";
import { env } from "@/lib/env.mjs";

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.POSTGRES_URL.endsWith("sslmode=require")
      ? env.POSTGRES_URL
      : env.POSTGRES_URL.concat("?sslmode=require"),
  },
  breakpoints: true,
} satisfies Config;
