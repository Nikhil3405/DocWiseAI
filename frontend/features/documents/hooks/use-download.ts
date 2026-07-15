import { useMutation } from "@tanstack/react-query";

import { documentService } from "../services/document-service";

export function useDownload() {
  return useMutation({
    mutationFn: (id: string) =>
      documentService.getDownloadUrl(id),
  });
}