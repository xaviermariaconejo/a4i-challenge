import { useState, useEffect, type PropsWithChildren, type FC } from "react";

import { useGetMessages } from "../../api/messages/get/hook";
import { AGENT_MESSAGE, type Message, USER_MESSAGE } from "../../types/Message";
import { socket } from "../../socket";
import { SOCKET_EVENT_TYPES, SOCKET_EVENTS } from "../../socket/constants";
import { type ChatContextType, ChatContext } from "./context";

export const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data, error: fetchError, isLoading } = useGetMessages();
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
  }, []);

  const sendMessage: ChatContextType["sendMessage"] = (content) => {
    const text = content.trim();
    if (!text) return;

    /*
    Caution: Inconsistency between FE & BE with messages ids.
             Since BE does not store the user messages.
    */
    const message = {
      id: messages.length + 1,
      content: text,
      type: USER_MESSAGE,
    };
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
