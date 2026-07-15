import { api } from "@/lib/api";
import { Document } from "../types/document";

class DocumentService {
  async getDocuments(): Promise<Document[]> {
    const response = await api.get("/documents/");
    return response.data.items;
  }

  async getDocument(id: string): Promise<Document> {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  }

async toggleFavorite(id: string) {
  const response = await api.patch(
    `/documents/${id}/favorite`
  );

  return response.data;
}

async deleteDocument(id: string) {
  const response = await api.delete(
    `/documents/${id}`
  );

  return response.data;
}

  async getDownloadUrl(id: string): Promise<{ url: string }> {
    const response = await api.get(`/documents/${id}/download`);

    return response.data;
  }
  async getPreviewUrl(id: string): Promise<{ url: string }> {
    const response = await api.get(`/documents/${id}/preview`);

    return response.data;
  }

}

export const documentService =
  new DocumentService();