import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

interface Props {
  data: {
    period: string;
    total: number;
  }[];
}

const ConsultationChart = ({ data }: Props) => {
  return (
    <Card>
      <CardHeader className="font-semibold text-lg">
        Jumlah Konsultasi per Bulan
      </CardHeader>

      <CardBody className="h-[300px]">
        {data.length === 0 ? (
          <p className="text-sm text-gray-500">
            Belum ada data konsultasi.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="total" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardBody>
    </Card>
  );
};

export default ConsultationChart;
