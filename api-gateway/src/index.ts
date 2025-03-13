import app from "./app";
import { createTables } from "./database/setup"; // Import the function

async function startServer() {
  try {
    await createTables(); // Run table creation before starting the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
