"use client";

import { useParams, useRouter } from "next/navigation";

import { useDocument } from "@/features/documents/hooks/use-document";
import { useDownload } from "@/features/documents/hooks/use-download";

import { DocumentHeader } from "@/features/documents/components/document-header";
import { SummaryCard } from "@/features/documents/components/summary-card";
import { MetadataCard } from "@/features/documents/components/metadata-card";
import { TagsCard } from "@/features/documents/components/tags-card";
import { ActionsCard } from "@/features/documents/components/actions-card";
import { DocumentPreview } from "@/features/documents/components/document-preview";
import { useState } from "react";
import { useDeleteDocument } from "@/features/documents/hooks/use-delete-document";
import { DeleteDocumentDialog } from "@/features/documents/components/delete-document-dialog";
import { useToggleFavorite } from "@/features/documents/hooks/use-toggle-favorite";

export default function DocumentPage() {
  const params = useParams();
  const router = useRouter();
  const { data: document, isLoading } = useDocument(params.id as string);
  const toggleFavorite = useToggleFavorite();
  // ✅ Hook is always called
  const download = useDownload();

  const deleteDocument = useDeleteDocument();

  const [deleteOpen, setDeleteOpen] = useState(false);
  async function handleFavorite() {
    if (!document) return;

    try {
      await toggleFavorite.mutateAsync(document.id);
    } catch {
      // Toast is handled in the hook
    }
  }
  async function handleDelete() {
    if (!document) return;

    setDeleteOpen(false);

    try {
      await deleteDocument.mutateAsync(document.id);
      router.replace("/documents");
    } catch {
      // Error toast is already handled in the hook
    }
  }

  async function handleDownload() {
    if (!document) return;

    const result = await download.mutateAsync(document.id);

    window.open(result.url, "_blank");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!document) {
    return <div>Document not found.</div>;
  }

  return (
    <div className="space-y-8">
      <DocumentHeader document={document} />

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 space-x-6 space-y-7">
          <DocumentPreview documentId={document.id} />
          <MetadataCard metadata={document.document_metadata} />
        </div>

        <div className="space-y-6 lg:col-span-2">
          <ActionsCard
            documentId={document.id}
            favorite={document.is_favorite}
            documentName={document.original_file_name}
            onDownload={handleDownload}
            onFavorite={handleFavorite}
            onDelete={() => setDeleteOpen(true)}
          />
          <SummaryCard summary={document.ai_summary} />


          <TagsCard tags={document.tags} />

        </div>
      </div>
      <DeleteDocumentDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDelete={handleDelete}
        loading={deleteDocument.isPending}
      />
    </div>
  );
}
