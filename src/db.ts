import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import process from "process"

export async function getDB(){
    const connectionString = process.env.DB_URI as string
    const client = postgres(connectionString);
    const db = drizzle(client);
    await migrate(db, { migrationsFolder: "drizzle" });
    return db
}