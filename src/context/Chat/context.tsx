import { createContext } from "react";

import type { Message } from "../../types/Message";

export interface ChatContextType {
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendMessage: (content: string) => void;
}

export const ChatContext = createContext<ChatContextType | null>(null);
