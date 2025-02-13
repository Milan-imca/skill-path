import { config } from "dotenv";
config({ path: ".env.local" });

/** @type {import("drizzle-kit").Config} */
export default {
  schema: "./configs/schema.jsx",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION, // Use the loaded environment variable
  },
};
