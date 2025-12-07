// AddRuleModal.tsx
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
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import useAddRuleModal from "./useAddRuleModal";
import { ISpecification } from "@/types/Specification";
import { IMaterial } from "@/types/Material";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchRules: () => void;
}

const AddRuleModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchRules } = props;

  const {
    control,
    errors,
    handleSubmitForm,
    handleAddRule,
    isPendingMutateAdd,
    isSuccessMutateAdd,

    dataSpecification,
    dataMaterial,
  } = useAddRuleModal();

  useEffect(() => {
  if (isSuccessMutateAdd) {
    onClose();        // otomatis tutup modal
    refetchRules();   // refresh list rule
  }
}, [isSuccessMutateAdd]);


  // close + refetch when success (useEffect optional; we do inline safe action)
  // caller can also use isSuccessMutateAdd if they prefer

  const disabledSubmit = isPendingMutateAdd;

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
          handleSubmitForm(handleAddRule)();
        }}
      >
        <ModalContent className="m-4">
          <ModalHeader>Add Rule</ModalHeader>

          <ModalBody>
            <div className="flex flex-col gap-4">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Rule Name"
                    variant="bordered"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              {/* CONDITIONS */}
              <Controller
                name="conditions"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <Select
                    {...field}
                    label="Conditions (Specifications)"
                    selectionMode="multiple"
                    variant="bordered"
                    isInvalid={!!errors.conditions}
                    errorMessage={errors.conditions?.message}
                    onSelectionChange={(val) => {
                      // val is a Set-like or Key; normalize to string[]
                      try {
                        // @ts-ignore runtime value -> convert to array of strings
                        const arr = Array.from(val as Set<unknown>).map((v) =>
                          String(v),
                        );
                        onChange(arr);
                      } catch {
                        onChange([]);
                      }
                    }}
                    // value prop avoided to not conflict with SelectProps typing
                  >
                    {dataSpecification?.data?.data?.map((spec: ISpecification) => (
                      <SelectItem key={`${spec._id}`} value={`${spec._id}`}>
                        {spec.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />

              {/* RESULT MATERIAL */}
              <Controller
                name="result"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <Autocomplete
                    {...(field as any)}
                    defaultItems={dataMaterial?.data?.data || []}
                    label="Result Material"
                    variant="bordered"
                    isInvalid={!!errors.result}
                    errorMessage={errors.result?.message}
                    onSelectionChange={(v) => {
                      // v could be a Key | null - cast to string
                      try {
                        // v might be Set or string depending on autocomplete config
                        const val = Array.isArray(v)
                          ? String(v[0])
                          : String(v as unknown);
                        onChange(val);
                      } catch {
                        onChange("");
                      }
                    }}
                    placeholder="Select material..."
                  >
                    {(material: IMaterial) => (
                      <AutocompleteItem key={`${material._id}`}>
                        {material.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              onPress={onClose}
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
              {isPendingMutateAdd ? <Spinner size="sm" color="white" /> : "Create Rule"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddRuleModal;
