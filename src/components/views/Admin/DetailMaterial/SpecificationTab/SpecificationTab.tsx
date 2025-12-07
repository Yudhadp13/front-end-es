import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import useSpecificationTab from "./useSpecificationTab";
import { useEffect } from "react";
import { IMaterialForm } from "@/types/Material";
import { ISpecification } from "@/types/Material";

interface PropTypes {
  dataMaterial: IMaterialForm;
  onUpdate: (data: IMaterialForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const SpecificationTab = (props: PropTypes) => {
  const { dataMaterial, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    control,
    errors,
    isValid,
    trigger,
    handleSubmitForm,
    resetForm,
    setValueForm,
    dataSpecification,
  } = useSpecificationTab();

  // Set default values saat dataMaterial masuk
  useEffect(() => {
    if (dataMaterial) {
      setValueForm("characteristics", dataMaterial?.characteristics || []);
      trigger("characteristics"); // ⬅ validasi ulang biar error muncul
    }
  }, [dataMaterial]);

  // Reset setelah success update
  useEffect(() => {
    if (isSuccessUpdate) {
      resetForm();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Material Specifications</h1>
        <p className="w-full text-small text-default-400">
          Manage specifications of this material
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmitForm(onUpdate)}
        >
          <Skeleton
            isLoaded={!!dataMaterial?.characteristics}
            className="rounded-lg"
          >
            <Controller
              name="characteristics"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Select
                  {...field}
                  selectionMode="multiple"
                  label="Specifications"
                  variant="bordered"
                  isInvalid={!!errors.characteristics}
                  errorMessage={errors.characteristics?.message}
                  onSelectionChange={(value) =>
                    onChange(Array.from(value as Set<string>))
                  }
                >
                  {dataSpecification?.data?.data?.map(
                    (spec: ISpecification) => (
                      <SelectItem key={spec._id} value={spec._id}>
                        {spec.name}
                      </SelectItem>
                    )
                  )}
                </Select>
              )}
            />
          </Skeleton>

          <Button
            color="primary"
            type="submit"
            className="mt-2 disabled:bg-default-500 bg-blue-900"
            disabled={isPendingUpdate || !isValid} // ⬅ FIXED
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default SpecificationTab;
