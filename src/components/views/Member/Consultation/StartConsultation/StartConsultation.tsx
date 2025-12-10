// views/Member/Consultation/StartConsultation/StartConsultation.tsx

import { Button, Card, CardBody, Image, Spinner } from "@nextui-org/react";
import { START_CONSULTATION_CONTENT } from "./StartConsultation.constants";
import useStartConsultation from "./useStartConsultation";

const StartConsultation = () => {
  const { handleStart, isPendingStart } = useStartConsultation();

  return (
    <div className="w-full flex flex-col items-center py-10 px-4 ">
      <Card className="max-w-xl w-full shadow-md">
        <CardBody className="flex flex-col gap-6 items-center p-8">

          {START_CONSULTATION_CONTENT.illustration && (
            <Image
              src={START_CONSULTATION_CONTENT.illustration}
              alt="Consultation Start"
              className="w-60 h-auto"
            />
          )}

          <h1 className="text-2xl font-bold text-center">
            {START_CONSULTATION_CONTENT.title}
          </h1>

          <p className="text-center text-gray-600">
            {START_CONSULTATION_CONTENT.description}
          </p>

          <Button
            color="primary"
            size="lg"
            className="bg-blue-900 w-full"
            onPress={handleStart}
            disabled={isPendingStart}
          >
            {isPendingStart ? <Spinner color="white" size="sm" /> : START_CONSULTATION_CONTENT.buttonLabel}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default StartConsultation;
