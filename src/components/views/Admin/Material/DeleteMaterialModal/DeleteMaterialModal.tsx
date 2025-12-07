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
import useDeleteMaterialModal from "./useDeleteMaterialModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchMaterials: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteMaterialModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchMaterials,
  } = props;

  const {
    mutateDeleteMaterial,
    isPendingMutateDeleteMaterial,
    isSuccessMutateDeleteMaterial,
  } = useDeleteMaterialModal();

  useEffect(() => {
    if (isSuccessMutateDeleteMaterial) {
      onClose();
      refetchMaterials();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteMaterial]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Material</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this material?
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
            disabled={isPendingMutateDeleteMaterial}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            className="bg-blue-900"
            type="submit"
            disabled={isPendingMutateDeleteMaterial}
            onPress={() => mutateDeleteMaterial(selectedId)}
          >
            {isPendingMutateDeleteMaterial ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Material"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteMaterialModal;