export interface Document {
  id: string;
  original_file_name: string;
  document_type: string | null;
  status: "PROCESSING" | "READY" | "FAILED";
  created_at: string;
  is_favorite: boolean;
  ai_summary: string | null;
  tags: string[] | null;
  document_metadata: Record<string, unknown> | null;
}