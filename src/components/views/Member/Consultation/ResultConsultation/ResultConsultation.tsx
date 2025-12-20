// src/components/views/Member/Consultation/ResultConsultation/ResultConsultation.tsx

import { Button, Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import useResultConsultation from "./useResultConsultation";
import {
  RESULT_TITLE,
  RESULT_DESCRIPTION,
  RETAKE_BUTTON_LABEL,
} from "./ResultConsultation.constants";

import type { IQuestionHistory } from "@/types/Consultation";

interface Props {
  sessionId: string;
}

const ResultConsultation = ({ sessionId }: Props) => {
  const { sessionDetail, isLoading, handleRetake } =
    useResultConsultation(sessionId);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner />
      </div>
    );
  }

  const material = sessionDetail?.result || null;
  const questionHistory = sessionDetail?.questionHistory || [];
  const platforms = sessionDetail?.platforms || [];

  return (
    <div className="p-4 flex flex-col gap-6">

      {/* Material Result */}
      {material ? (
        <Card>
          <CardHeader className="text-lg font-semibold">
            Rekomendasi Material
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-3">
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={material.banner}
                  alt={material.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold">{material.name}</h2>
              <p className="text-gray-600">{material.description}</p>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody>
            <p className="text-red-500 font-medium">
              Tidak ditemukan material yang cocok berdasarkan jawaban Anda.
            </p>
          </CardBody>
        </Card>
      )}

      {/* Question History */}
      <Card>
        <CardHeader className="text-lg font-semibold">
          Riwayat Pertanyaan
        </CardHeader>

        <CardBody className="flex flex-col gap-4">
          {questionHistory.map((item: IQuestionHistory, idx: number) => (
            <div key={idx} className="border rounded-lg p-3 bg-gray-50">
              <p className="font-medium">{typeof item.question === "string"
                ? item.question
                : item.question.questionText}</p>
              <p className="text-sm text-blue-700 font-semibold mt-1">
                Jawaban: {item.optionLabel}
              </p>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Platforms */}
      {platforms.length > 0 && (
        <Card>
          <CardHeader className="text-lg font-semibold border-b">
            Platform Pemesanan
          </CardHeader>

      <CardBody className="flex flex-wrap gap-3">
        {platforms.map((platform) => (
          <Button
            key={platform._id}
            as="a"
            href={platform.url}
            target="_blank"
            radius="md"
            size="sm"
            variant="bordered"
            className="border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition"
          >
            Pesan via {platform.name}
          </Button>
        ))}
      </CardBody>

        </Card>
      )}

      {/* Retake CTA */}
      <Button
        color="primary"
        className="bg-blue-800 text-white"
        onPress={handleRetake}
      >
        {RETAKE_BUTTON_LABEL}
      </Button>
    </div>
  );
};

export default ResultConsultation;
