import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Member/Dashboard/Dashboard";

const ConsultationMemberPage = () => {
    return (
        <DashboardLayout 
            title="Consultation" 
            description="Expert system consultation page to determine the most optimal print material"
            type="member">
            <Dashboard/>
        </DashboardLayout>
    );
};

export default ConsultationMemberPage;