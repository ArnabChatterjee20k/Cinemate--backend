import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import process from "process";
import 'dotenv/config'

async function runMigrations() {
  const connectionString = process.env.DB_URI as string;
  const client = postgres(connectionString);
  const db = drizzle(client);
  console.log("Running migrations...");
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migrations applied ..");
    process.exit(0);
  } catch (error) {
    console.log("Migrations Failed..",error);
    process.exit(1);
  }
}

runMigrations();
