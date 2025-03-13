import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRES_USER || "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DB || "microservices",
  password: process.env.POSTGRES_PASSWORD || "password",
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
});

export async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_message_summary (
          user_id VARCHAR(255) PRIMARY KEY,
          message_count INTEGER DEFAULT 0,
          last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS messages (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(255),
          message TEXT,
          service_key VARCHAR(255),
          random_key VARCHAR(255),
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tables created or already exist.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}
