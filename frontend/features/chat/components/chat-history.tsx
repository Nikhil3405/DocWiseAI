import { ChatMessage } from "./chat-message";
import { ChatMessage as Message } from "../types/chat";

type Props = {
  messages: Message[];
};

export function ChatHistory({
  messages,
}: Props) {
  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
}