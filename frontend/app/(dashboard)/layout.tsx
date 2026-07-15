import { Sidebar } from "@/features/dashboard/components/sidebar";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { SidebarProvider } from "@/components/providers/sidebar-provider";
import { DashboardLayouts } from "@/components/layout/dashboard-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <DashboardLayouts>{children}</DashboardLayouts>
        </div>
      </SidebarProvider>
    </div>
  );
}
