"use client";

import { Download, MessageSquare, Star, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  documentId: string;
  favorite: boolean;
  documentName: string;
  onFavorite?: () => void;
  onDownload?: () => void;
  onAskAI?: () => void;
  onDelete?: () => void;
};

export function ActionsCard({
  documentId,
  favorite,
  onFavorite,
  onDownload,
  documentName,
  onAskAI,
  onDelete,
}: Props) {
  const router = useRouter();

  return (
    <section className="rounded-2xl border p-6">
      <h2 className="mb-5 text-xl font-semibold">Quick Actions</h2>

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() =>
            router.push(
              `/chat?document=${documentId}&name=${encodeURIComponent(documentName)}`,
            )
          }
        >
          <MessageSquare className="mr-2 size-4" />
          Ask AI
        </Button>

        <Button variant="outline" onClick={onDownload}>
          <Download className="mr-2 size-4" />
          Download
        </Button>

        <Button variant={favorite ? "default" : "outline"} onClick={onFavorite}>
          <Star className={`mr-2 size-4 ${favorite ? "fill-current" : ""}`} />

          {favorite ? "Favorited" : "Favorite"}
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          <Trash className="mr-2 size-4" />
          Delete
        </Button>
      </div>
    </section>
  );
}
