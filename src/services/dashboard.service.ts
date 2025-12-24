import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IConsultationStatistics } from "@/types/Dashboard";

const dashboardServices = {
  getConsultationStatistics: () =>
    instance.get<IConsultationStatistics>(
      `${endpoint.ADMIN}/dashboard/consultation-statistics`
    ),
};

export default dashboardServices;
