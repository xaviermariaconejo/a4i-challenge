import { useState, useEffect, type PropsWithChildren, type FC } from "react";

import { useGetMessages } from "../../api/messages/get/hook";
import { useMutationMessages } from "../../api/messages/post/hook";
import { AGENT_MESSAGE, type Message } from "../../types/Message";
import { type ChatContextType, ChatContext } from "./context";
import { useSocket } from "../Socket/hook";
import { SOCKET_EVENT_TYPES, SOCKET_EVENTS } from "../Socket/constants";

export const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const { socket } = useSocket();
  const { data, error: fetchError, isLoading } = useGetMessages();
  const { mutate } = useMutationMessages();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (data) setMessages(data);
  }, [data]);

  useEffect(() => {
    const handleStream = (payload: { type: string; content?: string }) => {
      if (payload.type !== SOCKET_EVENT_TYPES.STREAM || !payload.content)
        return;

      setMessages((prev) => {
        const tmpMsg = {
          id: -1,
          type: AGENT_MESSAGE,
          content: payload.content ?? "",
        };

        if (prev.length === 0) {
          return [tmpMsg];
        }

        const last = prev[prev.length - 1];
        if (last.id !== -1) {
          return [...prev, tmpMsg];
        }

        const newMsg = {
          ...last,
          content: `${last.content} ${payload.content}`.trim(),
        };
        return [...prev.slice(0, -1), newMsg];
      });
    };

    const handleStreamDone = (payload: { type: string }) => {
      if (payload.type !== SOCKET_EVENT_TYPES.DONE) return;

      setMessages((prev) => {
        if (prev.length === 0) return prev;

        const newMessages = [...prev];
        const lastIndex = prev.length - 1;
        const lastMsg = newMessages[lastIndex];

        newMessages[lastIndex] = {
          ...lastMsg,
          id: newMessages.length,
        };

        return newMessages;
      });
    };

    socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, handleStream);
    socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, handleStreamDone);

    return () => {
      socket.off(SOCKET_EVENTS.RECEIVE_MESSAGE, handleStream);
      socket.off(SOCKET_EVENTS.RECEIVE_MESSAGE, handleStreamDone);
    };
  }, [socket]);

  const sendMessage: ChatContextType["sendMessage"] = async (content) => {
    const text = content.trim();
    if (!text) return;

    const message = await mutate({ content: text });

    if (!message) {
      throw new Error("Error: send message error on add new message to Server");
    }

    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, message);
    setMessages((prev) => [...prev, message]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        loading: isLoading,
        error: fetchError ?? null,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
