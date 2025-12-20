import { Card, CardBody, Button } from "@nextui-org/react";
import { useRouter } from "next/router";

const MemberDashboard = () => {
  const router = useRouter();

  const handleStartConsultation = () => {
    router.push("/member/consultation/start");
  };

  return (
    <div className="flex flex-col gap-10 p-6">

      {/* =====================
          Welcome Section
      ====================== */}
      <section>
        <h1 className="text-2xl font-bold mb-2">
          Selamat Datang 👋
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Sistem pakar ini membantu Anda menentukan jenis material cetak
          yang paling sesuai berdasarkan kebutuhan dan preferensi Anda.
        </p>
      </section>

      {/* =====================
          CTA Consultation
      ====================== */}
      <section>
        <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
          <CardBody className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                Mulai Konsultasi Material
              </h2>
              <p className="text-sm opacity-90 max-w-md">
                Jawab beberapa pertanyaan sederhana untuk mendapatkan rekomendasi material cetak terbaik.
              </p>
            </div>

            <Button
              onPress={handleStartConsultation}
              className="bg-white text-blue-700 font-semibold px-6"
            >
              Mulai Sekarang
            </Button>
          </CardBody>
        </Card>
      </section>

      {/* =====================
          Illustration
      ====================== */}
      <section className="flex justify-center mt-6">
        <img
          src="/images/illustrations/member-dashboard.png"
          alt="Member Dashboard Illustration"
          className="max-w-md w-full opacity-90"
        />
      </section>

    </div>
  );
};

export default MemberDashboard;
