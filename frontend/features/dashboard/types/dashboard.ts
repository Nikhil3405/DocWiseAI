export interface DashboardResponse {
  total_documents: number;
  processing_documents: number;
  favorite_documents: number;
  storage_used: number;
  documents_by_type: {
    type: string;
    count: number;
  }[];
  expiring_documents: {
    id: string;
    original_file_name: string;
    expiry_date: string;
  }[];
  recent_documents: {
    id: string;
    original_file_name: string;
    document_type: string;
    created_at: string;
    status: string;
  }[];
}