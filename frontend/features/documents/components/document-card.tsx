"use client";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Star } from "lucide-react";

import { Document } from "../types/document";
import { DocumentIcon } from "./document-icon";
import { DocumentStatusBadge } from "./status-badge";

type Props = {
  document: Document;
};

export function DocumentCard({
  document,
}: Props) {
  return (
    <Link
      href={`/documents/${document.id}`}
      className="group block rounded-2xl border bg-background p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="shrink-0 rounded-xl border p-3">
            <DocumentIcon
              type={document.document_type}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3
              className="truncate font-semibold"
              title={document.original_file_name}
            >
              {document.original_file_name}
            </h3>

            <p className="mt-1 truncate text-sm text-muted-foreground">
              {document.document_type ??
                "Others"}
            </p>
          </div>
        </div>

        {document.is_favorite && (
          <Star className="size-5 shrink-0 fill-current text-yellow-500" />
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <DocumentStatusBadge
          status={document.status}
        />

        <span className="shrink-0 text-sm text-muted-foreground">
          {formatDistanceToNow(
            new Date(document.created_at),
            {
              addSuffix: true,
            }
          )}
        </span>
      </div>
    </Link>
  );
}