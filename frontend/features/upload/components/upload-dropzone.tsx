"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

import { useUpload } from "../hooks/use-upload";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

const MAX_FILE_SIZE = 20 * 1024 * 1024;
type Props = {
  onUploadSuccess?: () => void;
};
export function UploadDropzone({ onUploadSuccess }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);

  const uploadMutation = useUpload();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  async function handleUpload() {
    if (!selectedFile) return;

    const file = selectedFile;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Unsupported file type.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Maximum file size is 20 MB.");
      return;
    }

    try {
      await uploadMutation.mutateAsync(file);

      await queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["documents"],
      });

      toast.success("Upload started. AI is processing your document.");

      setSelectedFile(null);

      onUploadSuccess?.();
    } catch {
      toast.error("Upload failed.");
    }
  }

  return selectedFile ? (
    <div className="space-y-6">
      <UploadCloud className="mx-auto size-12 text-primary" />

      <div className="text-center">
        <h2 className="text-2xl font-semibold">Confirm Upload</h2>

        <p className="mt-2 text-muted-foreground">
          Review your file before uploading.
        </p>
      </div>

      <div className="rounded-xl border p-5">
        <p className="font-medium">{selectedFile.name}</p>

        <p className="text-sm text-muted-foreground">
          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => setSelectedFile(null)}>
          Cancel
        </Button>

        <Button onClick={handleUpload} disabled={uploadMutation.isPending}>
          {uploadMutation.isPending ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  ) : (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();

        setDragging(false);

        const file = e.dataTransfer.files[0];

        if (file) {
          setSelectedFile(file);
        }
      }}
      className={`rounded-3xl border-2 border-dashed p-16 text-center transition-all ${
        dragging ? "border-primary bg-muted" : "border-border"
      }`}
    >
      <UploadCloud className="mx-auto size-14 text-muted-foreground" />

      <h2 className="mt-6 text-2xl font-semibold">Upload Documents</h2>

      <p className="mt-2 text-muted-foreground">
        Drag & drop your files here or browse your computer.
      </p>

      <Button className="mt-8" onClick={() => inputRef.current?.click()}>
        Browse Files
      </Button>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".pdf,.docx,.png,.jpg,.jpeg"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            setSelectedFile(file);
          }
        }}
      />
    </div>
  );
}
