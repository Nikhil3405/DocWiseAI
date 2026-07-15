export function getStatusLabel(status: string) {
  switch (status) {
    case "UPLOADING":
      return "Uploading...";

    case "EXTRACTING_TEXT":
      return "Extracting text...";

    case "GENERATING_SUMMARY":
      return "Generating AI summary...";

    case "GENERATING_EMBEDDINGS":
      return "Indexing document...";

    case "READY":
      return "Ready";

    case "FAILED":
      return "Processing failed";

    default:
      return status;
  }
}