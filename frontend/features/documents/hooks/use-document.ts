import { useQuery } from "@tanstack/react-query";

import { documentService } from "../services/document-service";

export function useDocument(id: string) {
  return useQuery({
    queryKey: ["document", id],
    queryFn: () => documentService.getDocument(id),
    enabled: !!id,
  });
}