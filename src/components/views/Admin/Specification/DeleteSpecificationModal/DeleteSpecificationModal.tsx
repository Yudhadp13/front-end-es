import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteSpecificationModal from "./useDeleteSpecificationModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchSpecification: () => void;
  onOpenChange: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteSpecificationModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchSpecification,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteSpecification,
    isPendingMutateDeleteSpecification,
    isSuccessMutateDeleteSpecification,
  } = useDeleteSpecificationModal();

  useEffect(() => {
    if (isSuccessMutateDeleteSpecification) {
      onClose();
      refetchSpecification();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteSpecification]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Specification</ModalHeader>
        <ModalBody>
          <p className="text-medium">Are you sure you want to delete this specification?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteSpecification}
          >
            Cancel
          </Button>

          <Button
            color="primary"
            className="bg-blue-900"
            type="submit"
            disabled={isPendingMutateDeleteSpecification}
            onPress={() => mutateDeleteSpecification(selectedId)}
          >
            {isPendingMutateDeleteSpecification ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Specification"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteSpecificationModal;