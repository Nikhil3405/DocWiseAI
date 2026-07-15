"use client";

import {
  FileText,
  HardDrive,
  Star,
} from "lucide-react";

import { useDashboard } from "@/features/dashboard/hooks/use-dashboard";

export function UsageCard() {
  const { data } = useDashboard();

  const storageMB =
    (data?.storage_used ?? 0) / 1024 / 1024;

  const storageLimit = 1024; // 1GB

  const percent = Math.min(
    (storageMB / storageLimit) * 100,
    100
  );

  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <h2 className="mb-6 text-xl font-semibold">
        Usage
      </h2>

      <div className="space-y-4">
        <Info
          icon={<FileText className="size-5" />}
          label="Documents"
          value={data?.total_documents ?? 0}
        />

        <Info
          icon={<Star className="size-5" />}
          label="Favorites"
          value={data?.favorite_documents ?? 0}
        />

        <Info
          icon={<HardDrive className="size-5" />}
          label="Storage"
          value={`${storageMB.toFixed(2)} MB`}
        />
      </div>

    </section>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border p-3 transition-colors hover:bg-muted/40">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}