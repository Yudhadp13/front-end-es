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
import useAddMaterialModal from "./useAddMaterialModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";
import { ISpecification } from "@/types/Specification";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchMaterials: () => void;
}

const AddMaterialModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchMaterials } = props;

  const {
    control,
    errors,
    handleSubmitForm,
    handleAddMaterial,
    isPendingMutateAdd,
    isSuccessMutateAdd,
    setValue,

    preview,
    handleUploadBanner,
    isPendingUpload,
    handleDeleteBanner,
    isPendingDelete,
    handleOnClose,

    dataCategory,
    dataSpecification,
  } = useAddMaterialModal();

  useEffect(() => {
    if (isSuccessMutateAdd) {
      onClose();
      refetchMaterials();
    }
  }, [isSuccessMutateAdd]);

  const disabledSubmit =
    isPendingMutateAdd || isPendingUpload || isPendingDelete;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddMaterial)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Material</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>

              <div className="mb-4 flex flex-col gap-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Name"
                      variant="bordered"
                      isInvalid={errors.name !== undefined}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />

                <Controller
                  name="slug"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Slug"
                      variant="bordered"
                      isInvalid={errors.slug !== undefined}
                      errorMessage={errors.slug?.message}
                    />
                  )}
                />

                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataCategory?.data?.data || []}
                      label="Category"
                      variant="bordered"
                      isInvalid={errors.category !== undefined}
                      errorMessage={errors.category?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Select category..."
                    >
                      {(category: ICategory) => (
                        <AutocompleteItem key={`${category._id}`}>
                          {category.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />

                <Controller
                  name="isPublish"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Status"
                      variant="bordered"
                      isInvalid={errors.isPublish !== undefined}
                      errorMessage={errors.isPublish?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true" value="true">
                        Publish
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        Draft
                      </SelectItem>
                    </Select>
                  )}
                />

                <Controller
                  name="isSuperior"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Superior Material?"
                      variant="bordered"
                      isInvalid={errors.isSuperior !== undefined}
                      errorMessage={errors.isSuperior?.message}
                      disallowEmptySelection
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

              <p className="text-sm font-bold">Specifications</p>
              <div className="mb-4 flex flex-col gap-4">
                <Controller
                  name="characteristics"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Select
                      {...field}
                      selectionMode="multiple"
                      label="Specifications"
                      variant="bordered"
                      isInvalid={errors.characteristics !== undefined}
                      errorMessage={errors.characteristics?.message}
                      onSelectionChange={(value) =>
                        onChange(Array.from(value as Set<string>))
                      }
                    >
                      {dataSpecification?.data?.data?.map(
                        (spec: ISpecification) => (
                          <SelectItem key={`${spec._id}`} value={`${spec._id}`}>
                            {spec.name}
                          </SelectItem>
                        ),
                      )}
                    </Select>
                  )}
                />
              </div>

              <p className="text-sm font-bold">Banner</p>
              <Controller
                name="banner"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteBanner(onChange)}
                    onUpload={(files) => handleUploadBanner(files, onChange)}
                    isUploading={isPendingUpload}
                    isDeleting={isPendingDelete}
                    isInvalid={errors.banner !== undefined}
                    errorMessage={errors.banner?.message}
                    isDropable
                    preview={typeof preview === "string" ? preview : ""}
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

            <Button color="primary" className="bg-blue-900" type="submit" disabled={disabledSubmit}>
              {isPendingMutateAdd ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Material"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddMaterialModal;
