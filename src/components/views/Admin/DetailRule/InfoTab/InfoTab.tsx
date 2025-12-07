import { IRule } from "@/types/Rule";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useInfoTab from "./useInfoTab";

import { ISpecification } from "@/types/Specification";
import { IMaterial } from "@/types/Material";

interface PropTypes {
  dataRule: IRule;
  allSpecifications: ISpecification[];
  allMaterials: IMaterial[];
  onUpdate: (data: any) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const {
    dataRule,
    allSpecifications,
    allMaterials,
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate,
  } = props;

  const {
    control,
    errors,
    handleSubmit,
    reset,
    setValue,
  } = useInfoTab();

  // Set default values when dataRule loaded
  useEffect(() => {
    if (!dataRule) return;

    // name
    setValue("name", dataRule?.name || "");

    // conditions (string[])
    setValue("conditions", dataRule?.conditions || []);

    // result (string)
    setValue("result", dataRule?.result || "");
  }, [dataRule]);

  // Reset form after successful update
  useEffect(() => {
    if (isSuccessUpdate) reset();
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Rule Information</h1>
        <p className="w-full text-small text-default-400">
          Manage information for this rule
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onUpdate)}
        >
          {/* NAME */}
          <Skeleton isLoaded={!!dataRule?.name}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Rule Name"
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />
              )}
            />
          </Skeleton>

          {/* CONDITIONS */}
          <Skeleton isLoaded={!!dataRule?.conditions}>
            <Controller
              name="conditions"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Select
                  {...field}
                  selectionMode="multiple"
                  label="Conditions (Specifications)"
                  variant="bordered"
                  isInvalid={!!errors.conditions}
                  errorMessage={errors.conditions?.message}
                  onSelectionChange={(keys) =>
                    onChange(Array.from(keys as Set<string>))
                  }
                >
                  {allSpecifications.map((spec) => (
                    <SelectItem key={spec._id} value={spec._id}>
                      {spec.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </Skeleton>

          {/* RESULT MATERIAL */}
          <Skeleton isLoaded={!!dataRule?.result}>
            <Controller
              name="result"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={allMaterials}
                  selectedKey={value}
                  label="Result Material"
                  variant="bordered"
                  placeholder="Select material..."
                  isInvalid={!!errors.result}
                  errorMessage={errors.result?.message}
                  onSelectionChange={(key) => onChange(String(key))}
                >
                  {(item: IMaterial) => (
                    <AutocompleteItem key={item._id}>
                      {item.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </Skeleton>

          {/* BUTTON */}
          <Button
            color="primary"
            className="mt-2 bg-blue-900"
            type="submit"
            disabled={isPendingUpdate}
          >
            {isPendingUpdate ? <Spinner size="sm" /> : "Save Changes"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
