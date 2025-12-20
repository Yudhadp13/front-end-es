// src/components/views/Admin/Dashboard/Dashboard.tsx

import { Card, CardBody } from "@nextui-org/react";
import { DASHBOARD_CARDS } from "./Dashboard.constants";
import useDashboard from "./useDashboard";

const Dashboard = () => {
  const { totals } = useDashboard();

  return (
    <div className="flex flex-col gap-8">

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

      {/* ===== Illustration ===== */}
      <div className="flex justify-center mt-6">
        <img
          src="/images/illustrations/admin-dashboard.png"
          alt="Admin Dashboard Illustration"
          className="w-60 opacity-90"
        />
      </div>
    </div>
  );
};

export default Dashboard;
