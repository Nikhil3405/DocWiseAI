"use client";

import Link from "next/link";
import { MessageSquare, Upload } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { UploadDialog } from "@/features/upload/components/upload-dialog";

export function QuickActions() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="mb-8 rounded-2xl border bg-card p-6">
        <h2 className="text-xl font-semibold">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Upload a new document or start an AI conversation.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            size="lg"
            onClick={() => setOpen(true)}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>

          <Link href="/chat">
          <Button
            
            variant="outline"
            size="lg"
          >
              <MessageSquare className="mr-2 h-4 w-4" />
              AI Chat
          </Button>
            </Link>
        </div>
      </section>

      <UploadDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}