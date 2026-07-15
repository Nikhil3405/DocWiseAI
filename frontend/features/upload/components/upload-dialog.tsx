"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { UploadDropzone } from "./upload-dropzone";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function UploadDialog({
  open,
  onOpenChange,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-3xl p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>
            Upload Document
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <UploadDropzone
  onUploadSuccess={() => onOpenChange(false)}
/>
        </div>
      </DialogContent>
    </Dialog>
  );
}