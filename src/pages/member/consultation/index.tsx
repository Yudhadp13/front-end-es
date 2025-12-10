import DashboardLayout from "@/components/layouts/DashboardLayout";
import Consultation from "@/components/views/Member/Consultation";

const ConsultationMemberPage = () => {
  return (
    <DashboardLayout
      title="Consultation"
      description="Expert system consultation page to determine the most optimal print material"
      type="member"
    >
      <Consultation />
    </DashboardLayout>
  );
};

export default ConsultationMemberPage;
