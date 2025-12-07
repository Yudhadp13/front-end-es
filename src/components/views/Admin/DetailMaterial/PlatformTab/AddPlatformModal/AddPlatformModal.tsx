import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useAddPlatformModal from "./useAddPlatformModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchPlatform: () => void;
}

const AddPlatformModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchPlatform } = props;
  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddPlatform,
    isPendingMutateAddPlatform,
    isSuccessMutateAddPlatform,
  } = useAddPlatformModal();

  useEffect(() => {
    if (isSuccessMutateAddPlatform) {
      onClose();
      refetchPlatform();
    }
  }, [isSuccessMutateAddPlatform]);

  const handleOnClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={handleOnClose}
    >
      <form onSubmit={handleSubmitForm(handleAddPlatform)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Platform</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Information</p>
              <div className="flex flex-col gap-4">
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
                    />
                  )}
                />

                <Controller
                  name="url"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Url"
                      variant="bordered"
                      isInvalid={errors.url !== undefined}
                      errorMessage={errors.url?.message}
                    />
                  )}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              onPress={handleOnClose}
              disabled={isPendingMutateAddPlatform}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              className=" bg-blue-900"
              type="submit"
              disabled={isPendingMutateAddPlatform}
            >
              {isPendingMutateAddPlatform ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Platform"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddPlatformModal;