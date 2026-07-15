"use client";

import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DocumentsGrid } from "@/features/documents/components/documents-grid";
import { DocumentsToolbar } from "@/features/documents/components/documents-toolbar";
import { useDocuments } from "@/features/documents/hooks/use-documents";

export default function FavoritesPage() {
  const { data: documents = [], isLoading, isError } = useDocuments();

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const favoriteDocuments = documents.filter(
    (document) => document.is_favorite,
  );

  const filteredDocuments = favoriteDocuments.filter((document) => {
    const matchesSearch =
      document.original_file_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (document.document_type ?? "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesType =
      selectedType === "ALL" ||
      document.document_type === selectedType;

    const matchesStatus =
      selectedStatus === "ALL" ||
      document.status === selectedStatus;

    return (
      matchesSearch &&
      matchesType &&
      matchesStatus
    );
  });

  const documentTypes = Array.from(
    new Set(
      favoriteDocuments
        .map((document) => document.document_type)
        .filter(
          (type): type is string => Boolean(type),
        ),
    ),
  ).sort();

  if (isLoading) {
    return (
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          Favorites
        </h1>

        <p className="text-muted-foreground">
          Loading favorite documents...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
        <h2 className="font-semibold">
          Failed to load favorites
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <Star className="size-8 fill-yellow-400 text-yellow-400" />

          <h1 className="text-3xl font-bold">
            Favorites
          </h1>
        </div>

        <p className="mt-2 text-muted-foreground">
          Quickly access your important
          documents.
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
        favoritesOnly={true}
        onFavoritesToggle={() => {}}
        showFavoritesToggle={false}
      />

      {filteredDocuments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center">
          <Star className="mb-4 size-14 text-muted-foreground" />

          <h2 className="text-xl font-semibold">
            No favorite documents
          </h2>

          <p className="mt-2 max-w-sm text-muted-foreground">
            Mark documents as favorites to
            access them quickly from here.
          </p>

          <Button  className="mt-6">
            <Link href="/documents">
              Browse Documents
            </Link>
          </Button>
        </div>
      ) : (
        <DocumentsGrid
          documents={filteredDocuments}
        />
      )}
    </div>
  );
}