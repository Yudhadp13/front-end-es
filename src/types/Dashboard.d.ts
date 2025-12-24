// =======================
// DASHBOARD ADMIN
// =======================

interface IStatusStats {
  FINISHED: number;
  IN_PROGRESS: number;
}

interface ITopMaterial {
  _id: string;
  name: string;
  total: number;
}

interface IConsultationPeriod {
  period: string; // contoh: 2025-12
  total: number;
}

interface IConsultationStatistics {
  data: any;
  totalConsultation: number;
  statusStats: IStatusStats;
  topMaterials: ITopMaterial[];
  consultationByPeriod: IConsultationPeriod[];
}

export interface IAdminDashboardData {
  totalConsultation: number;
  statusStats: {
    FINISHED: number;
    IN_PROGRESS: number;
  };
  topMaterials: ITopMaterial[];
  consultationByPeriod: {
    period: string;
    total: number;
  }[];
}

export type {
  IStatusStats,
  ITopMaterial,
  IConsultationPeriod,
  IConsultationStatistics,
};
