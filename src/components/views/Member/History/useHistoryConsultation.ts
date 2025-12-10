// src/components/views/Member/History/useHistoryConsultation.ts

import { useQuery } from "@tanstack/react-query";
import consultationServices from "@/services/consultation.service";
import { useSearchParams } from "next/navigation";
import type { IConsultationHistoryPagination } from "@/types/Consultation";

const useHistoryConsultation = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const limit = "10";

  const {
    data: historyData,
    isLoading,
    refetch,
  } = useQuery<IConsultationHistoryPagination>({
    queryKey: ["ConsultationHistory", page],
    queryFn: async () => {
      const query = `page=${page}&limit=${limit}`;
      const res = await consultationServices.getHistory(query);
      return res.data as IConsultationHistoryPagination; // backend sudah ok tanpa wrapper "data"
    },
  });

  return {
    historyData,
    isLoading,
    refetch,
  };
};

export default useHistoryConsultation;
