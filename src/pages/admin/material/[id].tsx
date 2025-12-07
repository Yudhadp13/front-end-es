import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailMaterial from "@/components/views/Admin/DetailMaterial";

const AdminDetailMaterialPage = () => {
  return (
    <DashboardLayout
      title="Detail Material"
      description="Manage information for this material."
      type="admin"
    >
      <DetailMaterial />
    </DashboardLayout>
  );
};

export default AdminDetailMaterialPage;
