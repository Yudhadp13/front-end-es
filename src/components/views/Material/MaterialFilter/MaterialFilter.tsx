import { Controller } from "react-hook-form";
import useMaterialFilter from "./useMaterialFilter";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
import { ICategory } from "@/types/Category";
import { ISpecification } from "@/types/Specification";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Fragment, useEffect } from "react";

const MaterialFilter = () => {
  const { control, setValue, dataCategory, isSuccessGetCategory, dataSpecification, isSuccessGetSpecification } =
    useMaterialFilter();
    
  const {
    handleChangeCategory,
    handleChangeSpecification,
    handleChangeIsSuperior,
    currentCategory,
    currentSpecification,
    currentIsSuperior,
  } = useChangeUrl();

  useEffect(() => {
    if (currentCategory !== "") {
      setValue("category", `${currentCategory}`);
      setValue("isSuperior", `${currentIsSuperior}`);
    }
  }, [isSuccessGetCategory]);

  return (
    <div className="h-fit w-full rounded-xl border p-4 lg:sticky lg:top-20 lg:w-80">
      <h4 className="text-xl font-semibold">Filter</h4>
      <div className="mt-4 flex flex-col gap-4">
        {isSuccessGetCategory ? (
          <Fragment>
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultSelectedKey={`${currentCategory}`}
                  defaultItems={dataCategory?.data.data || []}
                  label="Category"
                  labelPlacement="outside"
                  variant="bordered"
                  onSelectionChange={(value) => {
                    onChange(value);
                    handleChangeCategory(value !== null ? `${value}` : "");
                  }}
                  placeholder="Search category here..."
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
              name="characteristics"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultSelectedKey={`${currentSpecification}`}
                  defaultItems={dataSpecification?.data.data || []}
                  label="Specification"
                  labelPlacement="outside"
                  variant="bordered"
                  onSelectionChange={(value) => {
                    let selected = "";

                    if (value && typeof value === "object") {
                      selected = (value as any).currentKey ?? "";
                    } else if (typeof value === "string") {
                      selected = value;
                    }

                    onChange(selected);
                    handleChangeSpecification(selected);
                  }}
                  placeholder="Search specification here..."
                >
                  {dataSpecification?.data?.data?.map(
                        (spec: ISpecification) => (
                    <AutocompleteItem key={`${spec._id}`} value={`${spec._id}`}>
                      {spec.name}
                    </AutocompleteItem>
                    ),
                  )}
                </Autocomplete>
              )}
            />
            <Controller
              name="isSuperior"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Select
                  {...field}
                  label="Superior"
                  labelPlacement="outside"
                  placeholder="Select Superior Material"
                  variant="bordered"
                  defaultSelectedKeys={[`${currentIsSuperior}`]}
                  onChange={(e) => handleChangeIsSuperior(e.target.value)}
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
          </Fragment>
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialFilter;
