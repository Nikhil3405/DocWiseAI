"use client";

import { ReactNode } from "react";

import { useSidebar } from "@/components/providers/sidebar-provider";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/features/dashboard/components/sidebar";

export function DashboardLayouts({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <>
      <Sidebar />

      <main
        className={cn(
          "min-h-screen transition-all duration-300 p-4",
          collapsed ? "lg:ml-20" : "lg:ml-64",
        )}
      >
        {children}
      </main>
    </>
  );
}
