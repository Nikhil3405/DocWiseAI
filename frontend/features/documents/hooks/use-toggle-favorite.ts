import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { documentService } from "../services/document-service";

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: documentService.toggleFavorite,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      toast.success("Favorite updated.");
    },

    onError: () => {
      toast.error("Unable to update favorite.");
    },
  });
}