"use client";

import { DocumentsGrid } from "@/features/documents/components/documents-grid";
import { DocumentsToolbar } from "@/features/documents/components/documents-toolbar";
import { useDocuments } from "@/features/documents/hooks/use-documents";
import { useState } from "react";

export default function DocumentsPage() {
  const { data: documents = [], isLoading, isError } = useDocuments();
  const [search, setSearch] = useState("");

  const [selectedType, setSelectedType] = useState("ALL");

  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const filteredDocuments = documents.filter((document) => {
    const matchesSearch =
      document.original_file_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (document.document_type ?? "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesType =
      selectedType === "ALL" || document.document_type === selectedType;

    const matchesStatus =
      selectedStatus === "ALL" || document.status === selectedStatus;

    const matchesFavorite = !favoritesOnly || document.is_favorite;

    return matchesSearch && matchesType && matchesStatus && matchesFavorite;
  });

  const documentTypes = Array.from(
    new Set(
      documents
        .map((document) => document.document_type)
        .filter((type): type is string => Boolean(type)),
    ),
  ).sort();

  if (isLoading) {
    return (
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">My Documents</h1>

        <p className="text-muted-foreground">Loading documents...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
        <h2 className="font-semibold">Failed to load documents</h2>

        <p className="mt-2 text-sm text-muted-foreground">Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Documents</h1>

        <p className="mt-2 text-muted-foreground">
          Manage and search your uploaded documents.
        </p>
      </div>

      <DocumentsToolbar
        search={search}
        onSearchChange={setSearch}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        documentTypes={documentTypes}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        favoritesOnly={favoritesOnly}
        onFavoritesToggle={() => setFavoritesOnly((prev) => !prev)}
      />

      <DocumentsGrid documents={filteredDocuments} />
    </div>
  );
}
