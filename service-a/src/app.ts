import { Kafka, Consumer, EachMessagePayload } from "kafkajs";
import dotenv from "dotenv";
import { processMessage } from "./services/message.service";

dotenv.config();

const kafka = new Kafka({
  clientId: "service-a",
  brokers: [process.env.KAFKA_BROKERS || "kafka:9092"],
});

const consumer: Consumer = kafka.consumer({ groupId: "service-a-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "processing_topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }: EachMessagePayload) => {
      if (message.value) {
        const parsedMessage = JSON.parse(message.value.toString());
        if (parsedMessage.serviceKey === "serviceA") {
          await processMessage(parsedMessage);
        }
      }
    },
  });
};

run().catch(console.error);
