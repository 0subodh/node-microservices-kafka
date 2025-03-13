import { v4 as uuidv4 } from "uuid";
import { insertMessage } from "./postgres.service";

interface MessagePayload {
  userId: string;
  message: string;
  serviceKey: "serviceA" | "serviceB";
  timestamp: string;
}
export const processMessage = async (message: MessagePayload) => {
  try {
    const randomKey = uuidv4();
    await insertMessage(
      message.userId,
      message.message,
      message.serviceKey,
      randomKey
    );
    console.log(`Message processed by ${message.serviceKey}:`, message);
  } catch (error) {
    console.error(`Error processing message in ${message.serviceKey}:`, error);
  }
};
