import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailSpecification from "@/components/views/Admin/DetailSpecification/DetailSpecification";

const AdminDetailSpecificationPage = () => {
  return (
    <DashboardLayout
      title="Detail Specification"
      description="Manage information for this specification."
      type="admin"
    >
      <DetailSpecification />
    </DashboardLayout>
  );
};

export default AdminDetailSpecificationPage;
