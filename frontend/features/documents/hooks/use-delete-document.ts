import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { documentService } from "../services/document-service";

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: documentService.deleteDocument,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      toast.success("Document deleted.");
    },

    onError: () => {
      toast.error("Unable to delete document.");
    },
  });
}