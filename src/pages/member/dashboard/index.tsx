import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Member";

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