import { useMutation } from "@tanstack/react-query";

import { chatService } from "../services/chat-service";

export function useChat() {
  return useMutation({
    mutationFn: chatService.ask,
  });
}