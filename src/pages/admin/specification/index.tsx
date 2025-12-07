import DashboardLayout from "@/components/layouts/DashboardLayout";
import Specification from "@/components/views/Admin/Specification";

const AdminSpecificationPage = () => {
    return (
        <DashboardLayout 
        title="Specification" 
        description="List of all specification, create new specification, and manage existing specification." 
        type="admin">
            <Specification />
        </DashboardLayout>
    );
};

export default AdminSpecificationPage;