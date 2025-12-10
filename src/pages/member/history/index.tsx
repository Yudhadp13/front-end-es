import DashboardLayout from "@/components/layouts/DashboardLayout";
import HistoryConsultation from "@/components/views/Member/History";

const HistoryConsultationPage = () => {
  return (
    <DashboardLayout title="Consultation History" type="member">
      <HistoryConsultation />
    </DashboardLayout>
  );
};

export default HistoryConsultationPage;
