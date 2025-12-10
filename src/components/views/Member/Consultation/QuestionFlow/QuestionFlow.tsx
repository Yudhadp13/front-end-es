// src/components/views/Member/Consultation/QuestionFlow/QuestionFlow.tsx
import { Card, CardBody, Spinner, Radio, RadioGroup } from "@nextui-org/react";
import useQuestionFlow from "./useQuestionFlow";
import { QUESTION_FLOW_TEXT } from "./QuestionFlow.constants";
import type { IQuestionOption } from "@/types/Consultation";
import Image from "next/image";

interface PropTypes {
  sessionId: string;
}

const QuestionFlow = ({ sessionId }: PropTypes) => {
  const { currentQuestion, isLoading, handleAnswer, isPendingAnswer } =
    useQuestionFlow(sessionId);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="w-full flex justify-center mt-20">
        <p className="text-gray-600">Tidak ada pertanyaan saat ini.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-24">
      <Card shadow="md">
        <CardBody className="p-8">
          <h1 className="text-xl font-bold mb-1">{QUESTION_FLOW_TEXT.title}</h1>
          <p className="text-sm text-default-500 mb-6">
            {QUESTION_FLOW_TEXT.subtitle}
          </p>

          <p className="text-md font-semibold mb-4">
            {currentQuestion.questionText}
          </p>

          <RadioGroup
            label="Pilih salah satu jawaban:"
            className="mb-4"
            onValueChange={(value) => handleAnswer(value)}
            isDisabled={isPendingAnswer}
          >
            {currentQuestion.options?.map((opt: IQuestionOption) => (
              <Radio key={opt.value} value={opt.value}>
                {opt.label}
              </Radio>
            ))}
          </RadioGroup>

          {isPendingAnswer && (
            <div className="flex justify-center mt-4">
              <Spinner size="sm" />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default QuestionFlow;
