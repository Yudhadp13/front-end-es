import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Textarea } from "@nextui-org/react";
import useAddSpecificationModal from "./useAddSpecificationModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchSpecification: () => void;
  onOpenChange: () => void;
}

const AddSpecificationModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchSpecification } = props;

  const {
    control,
    errors,
    handleSubmitForm,
    handleAddSpecification,
    isPendingMutateAddSpecification,
    isSuccessMutateAddSpecification,
    handleOnClose,
  } = useAddSpecificationModal();

  useEffect(() => {
    if (isSuccessMutateAddSpecification) {
      onClose();
      refetchSpecification();
    }
  }, [isSuccessMutateAddSpecification]);

  const disabledSubmit = isPendingMutateAddSpecification;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddSpecification)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Specification</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>

              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                    className="mb-2"
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                    className="mb-2"
                  />
                )}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              className="bg-blue-900"
              type="submit"
              disabled={disabledSubmit}
            >
              {isPendingMutateAddSpecification ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Specification"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddSpecificationModal;