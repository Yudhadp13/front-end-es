// views/Member/Consultation/StartConsultation/useStartConsultation.tsx
import { useMutation } from "@tanstack/react-query";
import consultationServices from "@/services/consultation.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import type { IStartSessionResponse } from "@/types/Consultation";

const useStartConsultation = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);

  // NOTE: konsultationServices.startSession() mengembalikan AxiosResponse<IStartSessionResponse>
  // jadi kita perlu mengambil `res.data` (yang bertipe IStartSessionResponse)
const start = async (): Promise<IStartSessionResponse> => {
  const res = await consultationServices.startSession();
  return res.data; 
};

  const {
    mutate: mutateStart,
    // nama-nama state berikut disesuaikan dgn style projectmu (bisa isLoading / isPending)
    isPending: isPendingStart,
    isSuccess: isSuccessStart,
  } = useMutation({
    mutationFn: start,
    onError: (error: any) => {
      setToaster({ type: "error", message: error?.message || "Failed to start session" });
    },
onSuccess: (result: IStartSessionResponse) => {
  const sessionId = result?.data?.sessionId;

  if (!sessionId) {
    setToaster({ type: "error", message: "Session ID not found" });
    return;
  }

  router.push(`/member/consultation/${sessionId}`);
},

  });

  const handleStart = () => mutateStart();

  return {
    handleStart,
    isPendingStart,
    isSuccessStart,
  };
};

export default useStartConsultation;
