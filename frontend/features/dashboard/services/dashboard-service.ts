import { api } from "@/lib/api";
import { DashboardResponse } from "../types/dashboard";

class DashboardService {
async getDashboard(): Promise<DashboardResponse> {
    const response = await api.get("/dashboard");

    return response.data;
}
}

export const dashboardService =
  new DashboardService();