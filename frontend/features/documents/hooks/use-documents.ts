import { useQuery } from "@tanstack/react-query";
import { documentService } from "../services/document-service";

export function useDocuments() {
  return useQuery({
    queryKey: ["documents"],
    queryFn: () => documentService.getDocuments(),

    staleTime: 30000,

    refetchInterval: (query) => {
      const documents = query.state.data ?? [];

      return documents.some(
        (document: any) =>
          document.status !== "READY" &&
          document.status !== "FAILED"
      )
        ? 2000
        : false;
    },
  });
}