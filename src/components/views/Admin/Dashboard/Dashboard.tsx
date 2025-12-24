import { Card, CardBody, Spinner } from "@nextui-org/react";
import { DASHBOARD_CARDS } from "./Dashboard.constants";
import useDashboard from "./useDashboard";
import useAdminDashboard from "./useAdminDashboard";
import TopMaterialTable from "./TopMaterialTable";
import ConsultationChart from "./ConsultationChart";

const Dashboard = () => {
  const { totals } = useDashboard();
  const { data, isLoading } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">

      {/* ===== Overview Cards ===== */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {DASHBOARD_CARDS.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.key}
              shadow="sm"
              className={`${item.color} border`}
            >
              <CardBody className="flex flex-col items-center text-center gap-2 py-5">
                <Icon size={30} />

                <p className="text-sm font-medium">
                  {item.label}
                </p>

                <p className="text-xl font-bold">
                  {totals[item.key as keyof typeof totals]}
                </p>

                <p className="text-xs opacity-80">
                  {item.description}
                </p>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* ===== Consultation Statistics ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card shadow="sm">
          <CardBody className="text-center">
            <p className="text-sm text-gray-500">Total Konsultasi</p>
            <p className="text-3xl font-bold text-primary">
              {data.totalConsultation}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Total keseluruhan konsultasi
            </p>
          </CardBody>
        </Card>

        <Card shadow="sm">
          <CardBody className="text-center">
            <p className="text-sm text-gray-500">Selesai</p>
            <p className="text-3xl font-bold text-green-600">
              {data.statusStats.FINISHED}
            </p>
            <p className="text-xs text-green-700 mt-1">
              Berhasil menghasilkan rekomendasi
            </p>
          </CardBody>
        </Card>

        <Card shadow="sm">
          <CardBody className="text-center">
            <p className="text-sm text-gray-500">Dalam Proses</p>
            <p className="text-3xl font-bold text-yellow-600">
              {data.statusStats.IN_PROGRESS}
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Masih berlangsung
            </p>
          </CardBody>
        </Card>
      </div>

{/* ===== Consultation Chart ===== */}
<div className="mt-10">
  <ConsultationChart data={data.consultationByPeriod} />
</div>


{/* ===== Top Material Section ===== */}
<div className="mt-10">
  <TopMaterialTable data={data.topMaterials} />
</div>


      {/* ===== Illustration ===== */}
      <div className="flex justify-center mt-6">
        <img
          src="/images/illustrations/admin-dashboard.png"
          alt="Admin Dashboard Illustration"
          className="w-64 opacity-90"
        />
      </div>

    </div>
  );
};

export default Dashboard;
