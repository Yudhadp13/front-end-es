import DashboardLayout from "@/components/layouts/DashboardLayout";
import Rule from "@/components/views/Admin/Rule";

const AdminRulePage = () => {
  return (
    <DashboardLayout
      title="Rule"
      description="List of all rules, create new rule, and manage existing rules."
      type="admin"
    >
      <Rule />
    </DashboardLayout>
  );
};

export default AdminRulePage;
