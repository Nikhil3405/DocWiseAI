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
          <h2 className="text-xl font-semibold">
            Recent Documents
          </h2>

          <p className="text-sm text-muted-foreground">
            Recently uploaded files.
          </p>
        </div>

        <Button variant="ghost" size="sm">
          <Link href="/documents">
            View All
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <p className="text-sm text-muted-foreground">
            Loading...
          </p>
        )}

        {!isLoading &&
          data?.recent_documents.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No documents uploaded yet.
            </p>
          )}

        {data?.recent_documents
          .slice(0, 3)
          .map((document) => (
            <Link
              key={document.id}
              href={`/documents/${document.id}`}
              className="block rounded-xl border p-4 transition hover:bg-muted/40"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <FileText className="size-5 text-primary" />
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium">
                      {document.original_file_name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {document.document_type ?? "Document"}
                    </p>

                    <DocumentStatusBadge
                      status={document.status}
                    />
                  </div>
                </div>

                <ArrowRight className="mt-1 size-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}