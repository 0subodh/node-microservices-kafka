export interface MessagePayload {
  userId: string;
  message: string;
  serviceKey: "serviceA" | "serviceB";
  timestamp: string;
}

export interface SummaryData {
  user_id: string;
  message_count: number;
  last_updated: string;
}
