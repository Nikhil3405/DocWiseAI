export interface Citation {
  document_id: string;
  document_name: string;
}

export interface ChatRequest {
  question: string;
  document_id?: string;
}

export interface ChatResponse {
  answer: string;
  citations: Citation[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
}