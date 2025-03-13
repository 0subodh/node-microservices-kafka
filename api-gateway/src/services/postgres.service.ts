import { Pool } from "pg";
import dotenv from "dotenv";
import { SummaryData } from "../models/message.model"; //import model

dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRES_USER || "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DB || "microservices",
  password: process.env.POSTGRES_PASSWORD || "password",
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
});

export const getSummary = async (userId: string): Promise<SummaryData[]> => {
  try {
    const result = await pool.query(
      "SELECT * FROM user_message_summary WHERE user_id = $1",
      [userId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching summary:", error);
    return [];
  }
};
