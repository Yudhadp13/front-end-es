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
import useUpdatePlatformModal from "./useUpdatePlatformModal";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { IPlatform } from "@/types/Platform";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchPlatform: () => void;
  selectedDataPlatform: IPlatform | null;
  setSelectedDataPlatform: Dispatch<SetStateAction<IPlatform | null>>;
}

const UpdatePlatformModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchPlatform,
    selectedDataPlatform,
    setSelectedDataPlatform,
  } = props;

  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleUpdatePlatform,
    isPendingMutateUpdatePlatform,
    isSuccessMutateUpdatePlatform,
    setValueUpdatePlatform,
  } = useUpdatePlatformModal(`${selectedDataPlatform?._id}`);

  useEffect(() => {
    if (isSuccessMutateUpdatePlatform) {
      onClose();
      refetchPlatform();
      setSelectedDataPlatform(null);
    }
  }, [isSuccessMutateUpdatePlatform]);

  useEffect(() => {
    if (selectedDataPlatform) {
      setValueUpdatePlatform("name", `${selectedDataPlatform?.name}`);
      setValueUpdatePlatform("url", `${selectedDataPlatform?.url}`);
      setValueUpdatePlatform("description", `${selectedDataPlatform?.description}`);
    }
  }, [selectedDataPlatform]);

  const handleOnClose = () => {
    reset();
    onClose();
    setSelectedDataPlatform(null);
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={handleOnClose}
    >
      <form onSubmit={handleSubmitForm(handleUpdatePlatform)}>
        <ModalContent className="m-4">
          <ModalHeader>Update Platform</ModalHeader>
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
                  name="url"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="URL"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.url !== undefined}
                      errorMessage={errors.url?.message}
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
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              onPress={handleOnClose}
              disabled={isPendingMutateUpdatePlatform}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              className="bg-blue-900"
              type="submit"
              disabled={isPendingMutateUpdatePlatform}
            >
              {isPendingMutateUpdatePlatform ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Update Platform"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdatePlatformModal;
