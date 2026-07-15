import Link from "next/link";
import { FilePlus2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DocumentsEmptyState () {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border bg-muted">
        <FilePlus2 className="h-10 w-10 text-muted-foreground" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold">
        No documents yet
      </h2>

      <p className="mt-3 max-w-md text-muted-foreground">
        Upload your first document to unlock AI-powered search,
        summaries, metadata extraction, and document chat.
      </p>

      <Link href="/upload" className="mt-8">
        <Button size="lg">
          Upload Your First Document
        </Button>
      </Link>
    </div>
  );
}