import { api } from "@/lib/api";
import { ChatRequest, ChatResponse } from "../types/chat";

class ChatService {
  async ask(data: ChatRequest): Promise<ChatResponse> {
    const response = await api.post("/chat/", data);

    return response.data;
  }
}

export const chatService = new ChatService();