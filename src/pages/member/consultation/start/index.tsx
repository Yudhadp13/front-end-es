import DashboardLayout from "@/components/layouts/DashboardLayout";
import StartConsultation from "@/components/views/Member/Consultation/StartConsultation";

const StartConsultationMemberPage = () => {
  return (
    <DashboardLayout
      title="Consultation"
      description="Expert system consultation page to determine the most optimal print material"
      type="member"
    >
      <StartConsultation />
    </DashboardLayout>
  );
};

export default StartConsultationMemberPage;

