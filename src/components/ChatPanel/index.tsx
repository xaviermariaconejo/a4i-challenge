import { type FC, useState, type FormEvent } from "react";
import { useChat } from "../../context/Chat/hook";
import { USER_MESSAGE } from "../../types/Message";

export const ChatPanel: FC = () => {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Real-time Chat
      </h2>
      <div className="flex-1 flex flex-col overflow-y-auto gap-2 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded ${
              msg.type === USER_MESSAGE
                ? "bg-primary text-white self-end"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white self-start"
            } max-w-xs`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-l border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
          placeholder="Escribe un mensaje..."
        />
        <button
          type="submit"
          className="px-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-r"
        >
          Send
        </button>
      </form>
    </div>
  );
};
