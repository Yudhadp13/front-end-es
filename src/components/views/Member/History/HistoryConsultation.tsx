// src/components/views/Member/History/HistoryConsultation.tsx

import { Card, CardBody, Spinner, Pagination, Button, DateValue } from "@nextui-org/react";
import useHistoryConsultation from "./useHistoryConsultation";
import { HISTORY_TITLE, HISTORY_SUBTITLE } from "./HistoryConsultation.constants";
import Link from "next/link";

const HistoryConsultation = () => {
  const { historyData, isLoading } = useHistoryConsultation();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="lg" />
      </div>
    );
  }

  const formatDate = (value: string | DateValue | undefined) => {
  if (!value) return "-";

  // Jika string → langsung parse
  if (typeof value === "string") {
    return new Date(value).toLocaleString("id-ID");
  }

  // Jika DateValue → konversi ke Date
  if ("toDate" in value && typeof value.toDate === "function") {
    return value.toDate("UTC").toLocaleString("id-ID");
  }

  return "-";
};


  const list = historyData?.data || [];
  const pagination = historyData?.pagination;

  return (
    <div className="p-4 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{HISTORY_TITLE}</h1>
        <p className="text-sm text-gray-600">{HISTORY_SUBTITLE}</p>
      </div>

      {list.length === 0 ? (
        <Card>
          <CardBody className="text-center py-10">
            <p className="text-gray-600">Belum ada riwayat konsultasi.</p>
          </CardBody>
        </Card>
      ) : (
        list.map((item) => (
          <Card key={item._id}>
            <CardBody className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    {item.result?.name || "Tidak ada hasil"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(item.createdAt)}
                  </p>
                </div>

                <Button
                  as={Link}
                  href={`/member/consultation/${item._id}/result`}
                  color="primary"
                  className="bg-blue-900"
                  size="sm"
                >
                  Lihat Detail
                </Button>
              </div>
            </CardBody>
          </Card>
        ))
      )}

      {pagination && (
        <div className="flex justify-center mt-4">
          <Pagination
            page={pagination.current}
            total={pagination.totalPages}
            size="md"
            showShadow
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default HistoryConsultation;
