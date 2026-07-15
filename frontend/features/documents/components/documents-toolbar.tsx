"use client";

import { Search, Star } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;

  selectedType: string;
  onTypeChange: (value: string) => void;
  documentTypes: string[];

  selectedStatus: string;
  onStatusChange: (value: string) => void;

  favoritesOnly: boolean;
  onFavoritesToggle: () => void;

  showFavoritesToggle?: boolean;
};

export function DocumentsToolbar({
  search,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  favoritesOnly,
  onFavoritesToggle,
  documentTypes,
  showFavoritesToggle = true,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border p-4 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search documents..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="h-10 rounded-lg border bg-background px-3"
      >
        <option value="ALL">All Types</option>

        {documentTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>


      {showFavoritesToggle && (
        <Button
          variant={favoritesOnly ? "default" : "outline"}
          onClick={onFavoritesToggle}
        >
          <Star
            className={`mr-2 h-4 w-4 ${favoritesOnly ? "fill-current" : ""}`}
          />
          Favorites
        </Button>
      )}
    </div>
  );
}
