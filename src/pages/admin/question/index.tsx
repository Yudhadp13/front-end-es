import DashboardLayout from "@/components/layouts/DashboardLayout";
import Question from "@/components/views/Admin/Question";

const AdminQuestionPage = () => {
  return (
    <DashboardLayout
      title="Question"
      description="List of all Questions, create new Question, and manage existing Questions."
      type="admin"
    >
      <Question />
    </DashboardLayout>
  );
};

export default AdminQuestionPage;
