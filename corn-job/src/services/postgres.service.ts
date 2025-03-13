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

export const updateSummaryTable = async () => {
  try {
    // Clear existing summary data
    await pool.query("DELETE FROM user_message_summary");

    // Group messages by user and count
    const result = await pool.query(`
      INSERT INTO user_message_summary (user_id, message_count)
      SELECT user_id, COUNT(*)
      FROM messages
      GROUP BY user_id
    `);

    console.log("Summary table updated");
  } catch (error) {
    console.error("Error updating summary table:", error);
    throw error;
  }
};
