// src/components/views/Member/Consultation/QuestionFlow/useQuestionFlow.tsx
import { useQuery, useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import consultationServices from "@/services/consultation.service";
import type {
  ISessionDetail,
  IAnswerSessionResponse,
  IQuestion,
} from "@/types/Consultation";
import { useRouter } from "next/router";

/**
 * Hook untuk flow pertanyaan
 * @param sessionId string - id session dari route param
 */
const useQuestionFlow = (sessionId: string) => {
  const { setToaster } = useContext(ToasterContext);
  const router = useRouter();

  // -------------------------
  // Fetch session detail
  // -------------------------
  const {
    data: sessionData,
    isLoading,
    refetch: refetchSession,
  } = useQuery<ISessionDetail>({
    queryKey: ["SessionDetail", sessionId],
    queryFn: async () => {
      const res = await consultationServices.getSessionDetail(sessionId);
      return res.data.data as ISessionDetail;
    },
    enabled: !!sessionId,
    staleTime: 0,
  });

  const currentQuestion = (sessionData?.currentQuestion ||
    null) as IQuestion | null;

  // -------------------------
  // Mutation: jawab pertanyaan
  // -------------------------
  const answerMutation = useMutation({
    mutationFn: async (optionValue: string) => {
      const res = await consultationServices.answerQuestion(
        sessionId,
        optionValue
      );
      return res.data.data as IAnswerSessionResponse;
    },

    onSuccess: (data) => {
      // 1. JIKA SUDAH SELESAI
      if (data.finished === true) {
        router.push(`/member/consultation/${sessionId}/result`);
        return;
      }

      // 2. JIKA ADA NEXT QUESTION
      if (data.question) {
        refetchSession();
        return;
      }

      // 3. SAFE FALLBACK → ambil ulang session
      //   (bukan redirect, supaya tidak memaksa selesai)
      refetchSession();
    },

    onError: (err: any) => {
      setToaster({
        type: "error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Gagal mengirim jawaban. Silakan coba lagi.",
      });
    },
  });

  const handleAnswer = (optionValue: string) => {
    if (!sessionId) {
      setToaster({ type: "error", message: "Session ID tidak ditemukan" });
      return;
    }
    answerMutation.mutate(optionValue);
  };

  return {
    session: sessionData as ISessionDetail | undefined,
    currentQuestion,
    isLoading,
    handleAnswer,
    isPendingAnswer: answerMutation.isPending,
  };
};

export default useQuestionFlow;
