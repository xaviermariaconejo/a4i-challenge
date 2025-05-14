export type MessageType = "agentMessage" | "userMessage";

export const AGENT_MESSAGE: MessageType = "agentMessage";
export const USER_MESSAGE: MessageType = "userMessage";

export type Message = {
  id: number;
  content: string;
  type: MessageType;
};
