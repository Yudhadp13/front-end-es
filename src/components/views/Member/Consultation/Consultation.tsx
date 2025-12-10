// src/components/views/Member/Consultation/Consultation.tsx

import { Button, Card, CardBody, Spinner } from "@nextui-org/react";
import useConsultation from "./useConsultation";

const Consultation = () => {
  const { isLoading, goToStart } = useConsultation();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8 -mt-12">

      {/* Illustration */}
      <img
        src="/images/illustrations/consultation-illustration.png"
        alt="Consultation"
        className="w-64 opacity-90"
      />

      {/* Text */}
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-2">Expert System Consultation</h1>
        <p className="text-gray-600">
          Jawab beberapa pertanyaan dan dapatkan rekomendasi material terbaik
          berdasarkan kebutuhan Anda.
        </p>
      </div>

      {/* CTA */}
      <Button
        onPress={goToStart}
        color="primary"
        className="bg-blue-800 text-white w-64 h-12 text-lg"
      >
        Mulai Konsultasi
      </Button>
    </div>
  );
};

export default Consultation;
