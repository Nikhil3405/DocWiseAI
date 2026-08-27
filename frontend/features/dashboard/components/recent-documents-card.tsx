"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useDashboard } from "../hooks/use-dashboard";
import { DocumentStatusBadge } from "@/features/documents/components/status-badge";

export function RecentDocumentsCard() {
  const { data, isLoading } = useDashboard();

  return (
    <section className="rounded-2xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Recent Documents</h2>

          <p className="text-sm text-muted-foreground">
            Recently uploaded files.
          </p>
        </div>

        <Button variant="ghost" size="sm">
          <Link href="/documents">View All</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading...</p>
        )}

        {!isLoading && data?.recent_documents.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No documents uploaded yet.
          </p>
        )}

        {data?.recent_documents.slice(0, 3).map((document) => (
          <Link
            key={document.id}
            href={`/documents/${document.id}`}
            className="block min-w-0 rounded-xl border p-4 transition hover:bg-muted/40"
          >
            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <div className="shrink-0 rounded-lg bg-primary/10 p-2">
                  <FileText className="size-5 text-primary" />
                </div>

                <div className="min-w-0 space-y-2">
                  <p className="wrap-break-word font-medium leading-5">
                    {document.original_file_name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {document.document_type ?? "Document"}
                  </p>

                  <DocumentStatusBadge status={document.status} />
                </div>
              </div>

              <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
