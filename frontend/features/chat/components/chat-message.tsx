import { Bot, User } from "lucide-react";

import { ChatMessage as Message } from "../types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  message: Message;
};

export function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="size-5" />
        </div>
      )}

      <div
        className={`max-w-2xl rounded-2xl px-5 py-4 ${
          isUser ? "bg-primary text-primary-foreground" : "border"
        }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message.content}
        </ReactMarkdown>
        {!isUser && message.citations?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {message.citations.map((citation) => (
              <div
                key={citation.document_id}
                className="rounded-full border px-3 py-1 text-xs text-muted-foreground"
              >
                📄 {citation.document_name}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {isUser && (
        <div className="flex size-10 items-center justify-center rounded-full border">
          <User className="size-5" />
        </div>
      )}
    </div>
  );
}
