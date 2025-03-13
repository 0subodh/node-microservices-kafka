import { Kafka, Producer, ProducerRecord } from "kafkajs";
import dotenv from "dotenv";
import { MessagePayload } from "../models/message.model";

dotenv.config();

const kafka = new Kafka({
  clientId: "api-gateway",
  brokers: [process.env.KAFKA_BROKERS || "localhost:9092"],
});

const producer: Producer = kafka.producer();

export const publishMessage = async (message: MessagePayload) => {
  //use the model
  try {
    await producer.connect();
    const record: ProducerRecord = {
      topic: "processing_topic",
      messages: [{ value: JSON.stringify(message) }],
    };
    await producer.send(record);
    console.log("Message published to Kafka:", message);
  } catch (error) {
    console.error("Error publishing message:", error);
  } finally {
    await producer.disconnect();
  }
};
