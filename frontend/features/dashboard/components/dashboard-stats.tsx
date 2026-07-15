"use client";

import {
  FileText,
  Star,
  LoaderCircle,
  HardDrive,
} from "lucide-react";

import { useDashboard } from "../hooks/use-dashboard";

export function DashboardStats() {
  const { data, isLoading } = useDashboard();

  const stats = [
    {
      title: "Documents",
      value: data?.total_documents ?? 0,
      icon: FileText,
    },
    {
      title: "Favorites",
      value: data?.favorite_documents ?? 0,
      icon: Star,
    },

  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2 mb-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border bg-card p-6 transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {isLoading ? "--" : stat.value}
                </h3>
              </div>

              <div className="rounded-xl bg-primary/10 p-3">
                <Icon className="size-6 text-primary" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatStorage(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024)
    return `${(bytes / 1024).toFixed(1)} KB`;

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}