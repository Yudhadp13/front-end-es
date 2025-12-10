// src/pages/member/consultation/[sessionId]/result/index.tsx

import { useRouter } from "next/router";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ResultConsultation from "@/components/views/Member/Consultation/ResultConsultation";

const ResultPage = () => {
  const router = useRouter();
  const { sessionId } = router.query;

  // Cek sessionId siap
  if (!sessionId || typeof sessionId !== "string") {
    return (
      <DashboardLayout
        title="Consultation Result"
        description="Find the best print material based on your consultation session"
        type="member"
      >
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Consultation Result"
      description="Find the best print material based on your consultation session"
      type="member"
    >
      <ResultConsultation sessionId={sessionId} />
    </DashboardLayout>
  );
};

export default ResultPage;
