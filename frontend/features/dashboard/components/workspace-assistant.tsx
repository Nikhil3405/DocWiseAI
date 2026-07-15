"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bot } from "lucide-react";
import { v4 as uuid } from "uuid";

import { ChatInput } from "@/features/chat/components/chat-input";
import { ChatMessage } from "@/features/chat/components/chat-message";
import { useChat } from "@/features/chat/hooks/use-chat";
import type { ChatMessage as Message } from "@/features/chat/types/chat";

export function WorkspaceAssistant() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);

  const chat = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function handleSend(question: string) {
    const userMessage: Message = {
      id: uuid(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await chat.mutateAsync({
        question,
      });

      const assistantMessage: Message = {
        id: uuid(),
        role: "assistant",
        content: response.answer,
        citations: response.citations,
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: uuid(),
          role: "assistant",
          content: "Sorry, something went wrong.",
        },
      ]);
    }
  }

  return (
    <section className="flex h-[550px] flex-col overflow-hidden rounded-2xl border">
      {/* Header */}
      <div className="border-b p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2">
            <Bot className="size-5 text-primary" />
          </div>

          <div>
            <h2 className="font-semibold">
              Workspace Assistant
            </h2>

            <p className="text-sm text-muted-foreground">
              Ask anything about your documents.
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center text-muted-foreground">
            Start a conversation with your documents.
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
              />
            ))}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-5">
        <ChatInput
          onSend={handleSend}
          loading={chat.isPending}
        />

        {/* <Button
          variant="ghost"
          className="mt-3 w-full"
          onClick={() => router.push("/chat")}
        >
          Continue Full Conversation →
        </Button> */}
      </div>
    </section>
  );
}