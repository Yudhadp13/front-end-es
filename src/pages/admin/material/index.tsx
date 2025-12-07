import DashboardLayout from "@/components/layouts/DashboardLayout";
import Material from "@/components/views/Admin/Material";

const AdminMaterialPage = () => {
  return (
    <DashboardLayout
      title="Material"
      description="List of all materials, create new material, and manage existing materials."
      type="admin"
    >
      <Material />
    </DashboardLayout>
  );
};

export default AdminMaterialPage;
