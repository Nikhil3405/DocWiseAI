"use client";

import { FileText, FolderOpen, MessageSquare, Star } from "lucide-react";

import { WelcomeBanner } from "@/features/dashboard/components/welcome-banner";
import { StatsCard } from "@/features/dashboard/components/stats-card";
import { RecentDocuments } from "@/features/dashboard/components/recent-documents";
import { QuickActions } from "@/features/dashboard/components/quick-actions";
import { useDashboard } from "@/features/dashboard/hooks/use-dashboard";
import { DashboardHero } from "@/features/dashboard/components/dashboard-hero";
import { WorkspaceAssistant } from "@/features/dashboard/components/workspace-assistant";
import { DashboardStats } from "@/features/dashboard/components/dashboard-stats";
import { RecentDocumentsCard } from "@/features/dashboard/components/recent-documents-card";
import { useUser } from "@/hooks/use-user";
import { DashboardSkeleton } from "@/features/dashboard/components/dashboard-skeleton";


export default function DashboardPage() {
  const { data, isLoading } = useDashboard();
const user = useUser();
  if (data) {
    console.log("Dashboard data:", data);
  }
    if (isLoading) {
      return <DashboardSkeleton />;
  }
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="grid gap-8 lg:grid-cols-2 ">
          <WelcomeBanner name={user?.user_metadata.full_name ?? "User"} />
         
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
          <QuickActions />

            <DashboardStats />
            <RecentDocumentsCard />
          </div>

          <div className="lg:col-span-3">
            <WorkspaceAssistant />
          </div>
        </div>
      </div>
    </div>
  );
}
