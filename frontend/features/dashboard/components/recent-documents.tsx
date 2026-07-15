import { FileText } from "lucide-react";

type Document = {
  id: string;
  original_file_name: string;
  document_type: string;
};

type RecentDocumentsProps = {
  documents: Document[];
};

export function RecentDocuments({
  documents,
}: RecentDocumentsProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">
        Recent Documents
      </h2>

      <div className="rounded-2xl border">
        {documents.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            No documents uploaded yet.
          </div>
        ) : (
          documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between border-b p-5 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <FileText className="size-5 text-muted-foreground" />

                <div>
                  <p className="font-medium">
                    {doc.original_file_name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {doc.document_type}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}