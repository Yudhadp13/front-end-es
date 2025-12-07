// components/Question/AddQuestionModal/AddQuestionModal.tsx
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import useAddQuestionModal from "./useAddQuestionModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchQuestions: () => void;
}

const AddQuestionModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchQuestions } = props;

  const {
    control,
    errors,
    handleSubmitForm,
    handleAddQuestion,
    isPendingMutateAdd,
    isSuccessMutateAdd,
    fields,
    appendOption,
    removeOption,
    dataSpecification,
    dataQuestions,
  } = useAddQuestionModal();

  useEffect(() => {
    if (isSuccessMutateAdd) {
      onClose();
      refetchQuestions();
    }
  }, [isSuccessMutateAdd]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitForm(handleAddQuestion)();
        }}
      >
        <ModalContent className="m-4">
          <ModalHeader>Add Question</ModalHeader>

          <ModalBody>
            <div className="flex flex-col gap-4">
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

              <Controller
                name="questionText"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Question Text"
                    variant="bordered"
                    isInvalid={!!errors.questionText}
                    errorMessage={errors.questionText?.message}
                  />
                )}
              />

              <Controller
                name="isFirst"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Is First Question?"
                    variant="bordered"
                    disallowEmptySelection
                    isInvalid={!!errors.isFirst}
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

              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">Options</p>
                <Button size="sm" onPress={appendOption}>
                  Add Option
                </Button>
              </div>

              {/* options (dynamic) */}
              {fields.map((f, idx) => (
                <div
                  key={f.id}
                  className="grid grid-cols-1 gap-2 rounded border p-3 md:grid-cols-2"
                >
                  <Controller
                    name={`options.${idx}.label`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Label"
                        variant="bordered"
                        isInvalid={!!errors?.options?.[idx]?.label}
                        errorMessage={errors?.options?.[idx]?.label?.message}
                      />
                    )}
                  />
                  <Controller
                    name={`options.${idx}.value`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Value"
                        variant="bordered"
                        isInvalid={!!errors?.options?.[idx]?.value}
                        errorMessage={errors?.options?.[idx]?.value?.message}
                      />
                    )}
                  />

                  <div className="flex flex-col gap-2">
                    <Controller
                      name={`options.${idx}.specification`}
                      control={control}
                      render={({ field: { onChange, value, ...field } }) => (
                        <Autocomplete
                          {...(field as any)}
                          defaultItems={dataSpecification?.data?.data || []}
                          label="Specification"
                          variant="bordered"
                          placeholder="Select specification..."
                          onSelectionChange={(v) => {
                            try {
                              // Single selection: v might be Key or array
                              const val = Array.isArray(v) ? String(v[0]) : String(v as unknown);
                              onChange(val);
                            } catch {
                              onChange("");
                            }
                          }}
                        >
                          {(spec: any) => (
                            <AutocompleteItem key={spec._id}>{spec.name}</AutocompleteItem>
                          )}
                        </Autocomplete>
                      )}
                    />

                    <Controller
                      name={`options.${idx}.nextQuestion`}
                      control={control}
                      render={({ field: { onChange, value, ...field } }) => (
                        <Autocomplete
                          {...(field as any)}
                          defaultItems={dataQuestions?.data?.data || []}
                          label="Next Question (optional)"
                          variant="bordered"
                          placeholder="Select next question..."
                          onSelectionChange={(v) => {
                            try {
                              const val = Array.isArray(v) ? String(v[0]) : String(v as unknown);
                              onChange(val);
                            } catch {
                              onChange("");
                            }
                          }}
                        >
                          {(q: any) => (
                            <AutocompleteItem key={q._id}>{q.code} - {q.questionText}</AutocompleteItem>
                          )}
                        </Autocomplete>
                      )}
                    />
                  </div>

                  <div className="col-span-full flex justify-end">
                    <Button color="danger" variant="flat" onPress={() => removeOption(idx)}>
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" variant="flat" onPress={onClose} disabled={isPendingMutateAdd}>
              Cancel
            </Button>
            <Button color="primary" className="bg-blue-900" type="submit" disabled={isPendingMutateAdd}>
              {isPendingMutateAdd ? <Spinner size="sm" color="white" /> : "Create Question"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddQuestionModal;
