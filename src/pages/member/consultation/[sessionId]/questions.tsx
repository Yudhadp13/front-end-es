// src/pages/member/consultation/[sessionId]/questions/index.tsx

import { useRouter } from "next/router";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import QuestionFlow from "@/components/views/Member/Consultation/QuestionFlow";

const QuestionFlowMemberPage = () => {
  const router = useRouter();
  const { sessionId } = router.query;

  // Pastikan sessionId sudah siap
  if (!sessionId || typeof sessionId !== "string") {
    return (
      <DashboardLayout
        title="Consultation"
        description="Expert system consultation page to determine the most optimal print material"
        type="member"
      >
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Consultation"
      description="Expert system consultation page to determine the most optimal print material"
      type="member"
    >
      <QuestionFlow sessionId={sessionId} />
    </DashboardLayout>
  );
};

export default QuestionFlowMemberPage;
