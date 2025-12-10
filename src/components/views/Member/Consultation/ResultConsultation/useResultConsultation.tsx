// src/components/views/Member/Consultation/ResultConsultation/useResultConsultation.tsx

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import consultationServices from "@/services/consultation.service";
import { ToasterContext } from "@/contexts/ToasterContext";

import type { ISessionDetail } from "@/types/Consultation";

const useResultConsultation = (sessionId: string) => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const {
    data: sessionDetail,
    isLoading,
    refetch,
  } = useQuery<ISessionDetail>({
    queryKey: ["SessionResult", sessionId],
    queryFn: async () => {
      const res = await consultationServices.getSessionDetail(sessionId);
      return res.data.data as ISessionDetail;
    },
    enabled: !!sessionId,
  });

  const handleRetake = () => {
    router.push("/member/consultation/start");
  };

  return {
    sessionDetail,
    isLoading,
    refetch,
    handleRetake,
  };
};

export default useResultConsultation;
