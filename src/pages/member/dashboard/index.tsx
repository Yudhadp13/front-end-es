import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Member/Dashboard/Dashboard";

const DashboardMemberPage = () => {
    return (
        <DashboardLayout 
            title="Dashboard" 
            description="Dashboard member FDP Expert System"
            type="member">
            <Dashboard/>
        </DashboardLayout>
    );
};

export default DashboardMemberPage;