import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default {
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!.endsWith("sslmode=require")
      ? process.env.POSTGRES_URL!
      : process.env.POSTGRES_URL!.concat("?sslmode=require"),
  },
  breakpoints: true,
} satisfies Config;
