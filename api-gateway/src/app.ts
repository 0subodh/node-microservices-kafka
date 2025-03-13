import express from "express";
import dotenv from "dotenv";
import messageRoutes from "./routes/message.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/process", messageRoutes);

export default app;
