import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin";

const DashboardAdminPage = () => {
    return (
        <DashboardLayout 
        title="Dashboard" 
        description="Dashboard admin FDP Expert System" 
        type="admin">
            <Dashboard/>
        </DashboardLayout>
    );
};

export default DashboardAdminPage;