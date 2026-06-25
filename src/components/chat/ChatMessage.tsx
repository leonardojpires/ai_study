import { ReactNode } from "react";

export interface ChatMessageData {
  role: "assistant" | "user";
  text: string;
  ready: boolean;
}

interface ChatMessageProps {
  message: ChatMessageData;
  children?: ReactNode;
}

export function ChatMessage({ message, children }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`max-w-3xl ${
        isAssistant
          ? "self-start bg-white text-slate-900 rounded-[1.5rem] rounded-br-none border border-slate-200 px-5 py-4 shadow-sm"
          : "self-end bg-blue-600 text-white rounded-[1.5rem] rounded-bl-none px-5 py-4 shadow-sm"
      }`}
    >
      <p className="text-sm leading-6 whitespace-pre-line">{message.text}</p>
      {children}
    </div>
  );
}