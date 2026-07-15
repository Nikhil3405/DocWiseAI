import { Document } from "../types/document";
import { DocumentCard } from "./document-card";
import { DocumentsEmptyState  } from "./documents-empty-state";

type Props = {
  documents: Document[];
};

export function DocumentsGrid({
  documents,
}: Props) {
  if (!documents.length) {
    return <DocumentsEmptyState  />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
        />
      ))}
    </div>
  );
}