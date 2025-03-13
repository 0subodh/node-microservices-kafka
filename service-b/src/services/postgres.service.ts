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

export const insertMessage = async (
  userId: string,
  message: string,
  serviceKey: "serviceA" | "serviceB",
  randomKey: string
) => {
  try {
    await pool.query(
      "INSERT INTO messages (user_id, message, service_key, random_key) VALUES ($1, $2, $3, $4)",
      [userId, message, serviceKey, randomKey]
    );
    console.log(`Message inserted for ${serviceKey}.`);
  } catch (error) {
    console.error(`Error inserting message for ${serviceKey}:`, error);
  }
};
