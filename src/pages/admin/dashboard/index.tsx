import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard/Dashboard";

const DashboardAdminPage = () => {
    return (
        <DashboardLayout 
        title="Dashboard Admin" 
        description="Halaman ini digunakan untuk memantau dan mengelola data utama
          expert system pemilihan material percetakan digital, mulai dari
          basis pengetahuan hingga konten pendukung sistem." 
        type="admin">
            <Dashboard/>
        </DashboardLayout>
    );
};

export default DashboardAdminPage;