import { useQuery } from "@tanstack/react-query";

import { documentService } from "../services/document-service";

export function usePreview(documentId: string) {
  return useQuery({
    queryKey: ["preview", documentId],
    queryFn: () =>
      documentService.getPreviewUrl(documentId),
    enabled: !!documentId,
    staleTime: 1000 * 60 * 5,
  });
}