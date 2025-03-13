import cron from "node-cron";
import { updateSummaryTable } from "./services/postgres.service";

cron.schedule("*/5 * * * *", async () => {
  console.log("Running cron job to update summary table...");
  try {
    await updateSummaryTable();
    console.log("Summary table updated successfully.");
  } catch (error) {
    console.error("Error updating summary table:", error);
  }
});

console.log("Cron job scheduled to run every 5 minutes.");
