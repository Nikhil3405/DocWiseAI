import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard-service";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => dashboardService.getDashboard(),

    refetchInterval: (query) => {
      const dashboard = query.state.data;

      if (!dashboard) return false;

      const hasProcessing = dashboard.recent_documents.some(
        (document: any) =>
          document.status !== "READY" &&
          document.status !== "FAILED"
      );

      return hasProcessing ? 2000 : false;
    },
  });
}