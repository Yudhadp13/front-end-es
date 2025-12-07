import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@nextui-org/react";
import { Key, ReactNode, useCallback, useEffect, useState } from "react";
import { COLUMN_LISTS_QUESTION } from "./Question.constants";
import useQuestion from "./useQuestion";
import AddQuestionModal from "./AddQuestionModal";
import DeleteQuestionModal from "./DeleteQuestionModal";
import UpdateQuestionModal from "./UpdateQuestionModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { useRouter } from "next/router";
import { IQuestion } from "@/types/Question";

const Question = () => {
  const { push, isReady, query } = useRouter();

  const {
    dataQuestion,
    isLoadingQuestion,
    isRefetchingQuestion,
    refetchQuestion,
    selectedId,
    setSelectedId,
  } = useQuestion();

  const [selectedDataQuestion, setSelectedDataQuestion] = useState<IQuestion | null>(null);


  const addQuestionModal = useDisclosure();
  const deleteQuestionModal = useDisclosure();
  const updateQuestionModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) setUrl();
  }, [isReady]);

  const renderCell = useCallback(
    (question: any, columnKey: Key) => {
      const cellValue = question[columnKey as keyof typeof question];

      switch (columnKey) {
        case "options": {
          if (!Array.isArray(question.options) || question.options.length === 0) {
            return <Chip size="sm" variant="flat">-</Chip>;
          }

          return (
            <div className="flex flex-wrap gap-1">
              {question.options.map((opt: any, idx: number) => (
                <Chip key={idx} size="sm" variant="flat" color="primary">
                  {opt.label} → {opt.specification?.name || "-"}
                </Chip>
              ))}
            </div>
          );
        }

        case "isFirst": {
          return (
            <Chip
              size="sm"
              color={question.isFirst ? "success" : "default"}
              variant="flat"
            >
              {question.isFirst ? "Yes" : "No"}
            </Chip>
          );
        }

        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => {
              setSelectedDataQuestion(question);
              updateQuestionModal.onOpen();
            }}
              onPressButtonDelete={() => {
                setSelectedId(question._id);
                deleteQuestionModal.onOpen();
              }}
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [push]
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Question"
          columns={COLUMN_LISTS_QUESTION}
          data={dataQuestion?.data || []}
          emptyContent="Question list is empty"
          isLoading={isLoadingQuestion || isRefetchingQuestion}
          onClickButtonTopContent={addQuestionModal.onOpen}
          renderCell={renderCell}
          totalPages={dataQuestion?.pagination.totalPages}
        />
      )}

      {/* MODALS */}
      <AddQuestionModal
        {...addQuestionModal}
        refetchQuestions={refetchQuestion}
      />

      <DeleteQuestionModal
        {...deleteQuestionModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchQuestion={refetchQuestion}
      />
      
      <UpdateQuestionModal
  isOpen={updateQuestionModal.isOpen}
  onClose={updateQuestionModal.onClose}
  onOpenChange={updateQuestionModal.onOpenChange}
  refetchQuestion={refetchQuestion}
  selectedDataQuestion={selectedDataQuestion}
  setSelectedDataQuestion={setSelectedDataQuestion}
/>
      
    </section>
  );
};

export default Question;
