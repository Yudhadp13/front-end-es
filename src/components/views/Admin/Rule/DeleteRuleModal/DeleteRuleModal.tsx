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
import useDeleteRuleModal from "./useDeleteRuleModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchRule: () => void;
  onOpenChange: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteRuleModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchRule,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteRule,
    isPendingMutateDeleteRule,
    isSuccessMutateDeleteRule,
  } = useDeleteRuleModal();

  useEffect(() => {
    if (isSuccessMutateDeleteRule) {
      onClose();
      refetchRule();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteRule]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Rule</ModalHeader>

        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this rule?
          </p>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteRule}
          >
            Cancel
          </Button>

          <Button
            color="primary"
            className="bg-blue-900"
            type="submit"
            disabled={isPendingMutateDeleteRule}
            onPress={() => mutateDeleteRule(selectedId)}
          >
            {isPendingMutateDeleteRule ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Rule"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteRuleModal;
