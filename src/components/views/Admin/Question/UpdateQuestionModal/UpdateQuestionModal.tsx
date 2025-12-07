// components/views/Admin/Question/UpdateQuestionModal/UpdateQuestionModal.tsx
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { IQuestion } from "@/types/Question";
import useUpdateQuestionModal from "./useUpdateQuestionModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchQuestion: () => void;
  selectedDataQuestion: IQuestion | null;
  setSelectedDataQuestion: Dispatch<SetStateAction<IQuestion | null>>;
}

const UpdateQuestionModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchQuestion,
    selectedDataQuestion,
    setSelectedDataQuestion,
  } = props;

  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleUpdateQuestion,
    isPendingMutateUpdateQuestion,
    isSuccessMutateUpdateQuestion,
    setValueUpdateQuestion,
    fields,
    appendOption,
    removeOption,

    dataSpecification,
    dataQuestions,
  } = useUpdateQuestionModal(`${selectedDataQuestion?._id}`);

  /**
   * RESET & close modal on success update
   */
  useEffect(() => {
    if (isSuccessMutateUpdateQuestion) {
      onClose();
      refetchQuestion();
      setSelectedDataQuestion(null);
    }
  }, [isSuccessMutateUpdateQuestion]);

  /**
   * SET VALUES when selectedDataQuestion is loaded
   */
  useEffect(() => {
    if (selectedDataQuestion) {
      setValueUpdateQuestion("code", selectedDataQuestion.code);
      setValueUpdateQuestion("questionText", selectedDataQuestion.questionText);
      setValueUpdateQuestion("isFirst", selectedDataQuestion.isFirst ? "true" : "false");

      // Clear current options
      reset((prev) => ({ ...prev, options: [] }));
      selectedDataQuestion.options.forEach((opt, idx) => {
        appendOption();
        setValueUpdateQuestion(`options.${idx}.label`, opt.label);
        setValueUpdateQuestion(`options.${idx}.value`, opt.value);
        setValueUpdateQuestion(
        `options.${idx}.specification`,
        typeof opt.specification === "string"
            ? opt.specification
            : opt.specification?._id ?? ""   // PERBAIKAN ADA DI SINI
        );
        setValueUpdateQuestion(
          `options.${idx}.nextQuestion`,
          typeof opt.nextQuestion === "string"
            ? opt.nextQuestion
            : opt.nextQuestion?._id || null
        );
      });
    }
  }, [selectedDataQuestion]);

  /**
   * On close modal
   */
  const handleOnClose = () => {
    reset();
    onClose();
    setSelectedDataQuestion(null);
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={handleOnClose}
    >
      <form onSubmit={handleSubmitForm(handleUpdateQuestion)}>
        <ModalContent className="m-4">
          <ModalHeader>Update Question</ModalHeader>

          <ModalBody>
            <div className="flex flex-col gap-6">
              {/* Code */}
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Code"
                    variant="bordered"
                    isInvalid={!!errors.code}
                    errorMessage={errors.code?.message}
                  />
                )}
              />

              {/* Question Text */}
              <Controller
                name="questionText"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Question Text"
                    variant="bordered"
                    isInvalid={!!errors.questionText}
                    errorMessage={errors.questionText?.message}
                  />
                )}
              />

              {/* isFirst */}
              <Controller
                name="isFirst"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Is First Question?"
                    {...field}
                    variant="bordered"
                    isInvalid={!!errors.isFirst}
                    errorMessage={errors.isFirst?.message}
                  >
                    <SelectItem key="true" value="true">
                      Yes
                    </SelectItem>
                    <SelectItem key="false" value="false">
                      No
                    </SelectItem>
                  </Select>
                )}
              />

              {/* Options */}
              <div className="flex flex-col gap-4">
                <p className="text-sm font-semibold">Options</p>

                {fields.map((item, index) => (
                  <div key={item.id} className="border p-3 rounded-xl flex flex-col gap-3">
                    {/* Label */}
                    <Controller
                      name={`options.${index}.label`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Label"
                          variant="bordered"
                          isInvalid={!!errors.options?.[index]?.label}
                          errorMessage={errors.options?.[index]?.label?.message}
                        />
                      )}
                    />

                    {/* Value */}
                    <Controller
                      name={`options.${index}.value`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Value"
                          variant="bordered"
                          isInvalid={!!errors.options?.[index]?.value}
                          errorMessage={errors.options?.[index]?.value?.message}
                        />
                      )}
                    />

                    {/* Specification */}
                    <Controller
                      name={`options.${index}.specification`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Specification"
                          variant="bordered"
                          isInvalid={!!errors.options?.[index]?.specification}
                          errorMessage={errors.options?.[index]?.specification?.message}
                        >
                          {dataSpecification?.data?.data?.map((s: any) => (
                            <SelectItem key={s._id} value={s._id}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />

                    {/* Next Question */}
                    <Controller
                      name={`options.${index}.nextQuestion`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={field.value ?? ""}     
                          onChange={(val) => field.onChange(val)}
                          label="Next Question (Optional)"
                          variant="bordered"
                        >
                          <SelectItem key="null" value="">
                            None
                          </SelectItem>

                          {dataQuestions?.data?.data?.map((q: any) => (
                            <SelectItem key={q._id} value={q._id}>
                              {q.code}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />

                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      onPress={() => removeOption(index)}
                    >
                      Remove Option
                    </Button>
                  </div>
                ))}

                <Button color="primary" variant="flat" onPress={() => appendOption()}>
                  Add Option
                </Button>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              onPress={handleOnClose}
              disabled={isPendingMutateUpdateQuestion}
            >
              Cancel
            </Button>

            <Button
              color="primary"
              className="bg-blue-900"
              type="submit"
              disabled={isPendingMutateUpdateQuestion}
            >
              {isPendingMutateUpdateQuestion ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Update Question"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateQuestionModal;
