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
import useDeletePlatformModal from "./useDeletePlatformModal";
import { IPlatform } from "@/types/Platform";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchPlatform: () => void;
  selectedDataPlatform: IPlatform | null;
  setSelectedDataPlatform: Dispatch<SetStateAction<IPlatform | null>>;
}

const DeletePlatformModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchPlatform,
    selectedDataPlatform,
    setSelectedDataPlatform,
  } = props;

  const {
    mutateDeletePlatform,
    isPendingMutateDeletePlatform,
    isSuccessMutateDeletePlatform,
  } = useDeletePlatformModal();

  useEffect(() => {
    if (isSuccessMutateDeletePlatform) {
      onClose();
      refetchPlatform();
      setSelectedDataPlatform(null);
    }
  }, [isSuccessMutateDeletePlatform]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Platform</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this platform?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedDataPlatform(null);
            }}
            disabled={isPendingMutateDeletePlatform}
          >
            Cancel
          </Button>

          <Button
            color="primary"
            className="bg-blue-900"
            type="submit"
            disabled={isPendingMutateDeletePlatform}
            onPress={() => mutateDeletePlatform(`${selectedDataPlatform?._id}`)}
          >
            {isPendingMutateDeletePlatform ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Platform"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeletePlatformModal;