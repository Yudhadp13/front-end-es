// src/components/views/Member/Consultation/useConsultation.tsx

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import consultationServices from "@/services/consultation.service";
import { useEffect } from "react";

const useConsultation = () => {
  const router = useRouter();

  const {
    data: lastSession,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["LastConsultationSession"],
    queryFn: async () => {
      const res = await consultationServices.getHistory("limit=1&page=1");
      return res.data?.data;
    },
  });

  // cek apakah user punya session aktif
  useEffect(() => {
    if (!lastSession || !lastSession.data || lastSession.data.length === 0) {
      return;
    }

    const session = lastSession.data[0];

    if (session.status === "IN_PROGRESS") {
      router.push(`/member/consultation/${session._id}`);
    }

    if (session.status === "FINISHED") {
      router.push(`/member/consultation/${session._id}/result`);
    }
  }, [lastSession]);

  const goToStart = () => {
    router.push("/member/consultation/start");
  };

  return {
    isLoading,
    goToStart,
  };
};

export default useConsultation;
