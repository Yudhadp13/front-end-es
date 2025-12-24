import { useQuery } from "@tanstack/react-query";
import adminDashboardService from "@/services/dashboard.service";
import type { IAdminDashboardData } from "@/types/Dashboard.d";

const DEFAULT_DATA: IAdminDashboardData = {
  totalConsultation: 0,
  statusStats: {
    FINISHED: 0,
    IN_PROGRESS: 0,
  },
  topMaterials: [],
  consultationByPeriod: [],
};

const useAdminDashboard = () => {
  const { data, isLoading } = useQuery<IAdminDashboardData>({
    queryKey: ["admin-dashboard-consultation-statistics"],
    queryFn: async () => {
      const res = await adminDashboardService.getConsultationStatistics();
      return res.data.data; // ✅ FIX UTAMA
    },
  });

  return {
    data: data ?? DEFAULT_DATA,
    isLoading,
  };
};

export default useAdminDashboard;
