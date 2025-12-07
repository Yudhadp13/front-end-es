import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Member/Dashboard/Dashboard";

const HistoryMemberPage = () => {
    return (
        <DashboardLayout 
            title="History Consultation" 
            description="Page to view and manage consultation history"
            type="member">
            <Dashboard/>
        </DashboardLayout>
    );
};

export default HistoryMemberPage;