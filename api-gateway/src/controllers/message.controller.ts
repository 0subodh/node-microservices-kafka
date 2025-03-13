import { Request, Response } from "express";
import { publishMessage } from "../services/kafka.service";
import { getSummary } from "../services/postgres.service";
import { MessagePayload, SummaryData } from "../models/message.model"; // Import the model

export const processMessage = async (req: Request, res: Response) => {
  try {
    const { userId, message } = req.body;
    const serviceKey = Math.random() < 0.5 ? "serviceA" : "serviceB";

    const payload: MessagePayload = {
      userId,
      message,
      serviceKey,
      timestamp: new Date().toISOString(),
    };

    await publishMessage(payload);
    const summary: SummaryData[] = await getSummary(userId);

    res.json({ message: "Message processed", summary });
  } catch (error) {
    console.error("Error processing message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
