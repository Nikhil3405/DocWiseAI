"use client";

import { usePreview } from "../hooks/use-preview";

type Props = {
  documentId: string;
};

export function DocumentPreview({
  documentId,
}: Props) {
  const { data, isLoading } = usePreview(documentId);

  if (isLoading) {
    return (
      <div className="flex h-[700px] items-center justify-center rounded-2xl border">
        Loading preview...
      </div>
    );
  }

  if (!data?.url) {
    return (
      <div className="flex h-[700px] items-center justify-center rounded-2xl border">
        Preview unavailable
      </div>
    );
  }

  return (
    <iframe
      src={data.url}
      className="h-[700px] w-full rounded-2xl border"
    />
  );
}