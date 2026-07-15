"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";

import { ChatHistory } from "@/features/chat/components/chat-history";
import { ChatInput } from "@/features/chat/components/chat-input";
import { useChat } from "@/features/chat/hooks/use-chat";
import { ChatMessage } from "@/features/chat/types/chat";
import { ChatEmpty } from "@/features/chat/components/chat-empty";
import { useSearchParams } from "next/navigation";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const chat = useChat();
  const searchParams = useSearchParams();

  const documentId = searchParams.get("document");
  const documentName = searchParams.get("name");
  
  async function handleSend(question: string) {
    const userMessage: ChatMessage = {
      id: uuid(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await chat.mutateAsync({
        question,
        document_id: documentId ?? undefined,
      });

      const assistantMessage: ChatMessage = {
        id: uuid(),
        role: "assistant",
        content: response.answer,
        citations: response.citations,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: uuid(),
          role: "assistant",
          content: "Something went wrong while answering your question.",
        },
      ]);
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-5xl flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">AI Assistant</h1>

        <p className="mt-2 text-muted-foreground">
          Ask questions about your uploaded documents.
        </p>
        {documentName && (
          <p className="mt-2 text-muted-foreground">
            Chatting with {documentName}
          </p>
        )}
      </div>
      

      <div className="flex-1 overflow-y-auto rounded-xl border p-6">
        {messages.length === 0 ? (
          <ChatEmpty />
        ) : (
          <ChatHistory messages={messages} />
        )}
      </div>

      <div className="mt-6">
        <ChatInput onSend={handleSend} loading={chat.isPending} />
      </div>
    </div>
  );
}
