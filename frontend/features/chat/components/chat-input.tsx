"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  onSend: (message: string) => void;
  loading?: boolean;
};

export function ChatInput({
  onSend,
  loading,
}: Props) {
  const [message, setMessage] = useState("");

  function submit() {
    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  }

  return (
    <div className="flex gap-3">
      <Input
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="Ask anything..."
        onKeyDown={(e) => {
          if (e.key === "Enter")
            submit();
        }}
      />

      <Button
        onClick={submit}
        disabled={loading}
      >
        <Send className="size-4" />
      </Button>
    </div>
  );
}