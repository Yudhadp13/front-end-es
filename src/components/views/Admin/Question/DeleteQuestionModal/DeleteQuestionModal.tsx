import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteQuestionModal from "./useDeleteQuestionModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchQuestion: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteQuestionModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchQuestion,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteQuestion,
    isPendingMutateDeleteQuestion,
    isSuccessMutateDeleteQuestion,
  } = useDeleteQuestionModal();

  useEffect(() => {
    if (isSuccessMutateDeleteQuestion) {
      onClose();
      refetchQuestion();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteQuestion]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Question</ModalHeader>

        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this question?
          </p>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            disabled={isPendingMutateDeleteQuestion}
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
          >
            Cancel
          </Button>

          <Button
            color="primary"
            className="bg-blue-900"
            disabled={isPendingMutateDeleteQuestion}
            onPress={() => mutateDeleteQuestion(selectedId)}
          >
            {isPendingMutateDeleteQuestion ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Question"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteQuestionModal;
