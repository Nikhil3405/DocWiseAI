import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Document } from "../types/document";
import { DocumentStatusBadge } from "./status-badge";

type Props = {
  document: Document;
};

export function DocumentHeader({ document }: Props) {
  return (
    <div className="space-y-5">
      <Link href="/documents">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="size-4" />
          Back to Documents
        </Button>
      </Link>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            {document.document_type ?? document.original_file_name}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {document.original_file_name}
          </p>
        </div>

        <DocumentStatusBadge status={document.status} />
      </div>
    </div>
  );
}
