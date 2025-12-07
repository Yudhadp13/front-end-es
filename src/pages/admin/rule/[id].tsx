import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailRule from "@/components/views/Admin/DetailRule";

const AdminDetailRulePage = () => {
  return (
    <DashboardLayout
      title="Detail Rule"
      description="Manage information for this Rule."
      type="admin"
    >
      <DetailRule />
    </DashboardLayout>
  );
};

export default AdminDetailRulePage;
