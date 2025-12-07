import categoryServices from "@/services/category.service";
import specificationServices from "@/services/specification.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  category: yup.string(),
  characteristics: yup.array(),
  isSuperior: yup.string(),
});

const useMaterialFilter = () => {
  const { control, reset, watch, getValues, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: dataCategory, isSuccess: isSuccessGetCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
  });

  const { data: dataSpecification, isSuccess: isSuccessGetSpecification } = useQuery({
    queryKey: ["Specifications"],
    queryFn: () => specificationServices.getSpecifications(),
  });

  return {
    control,
    setValue,
    dataCategory,
    isSuccessGetCategory,
    dataSpecification,
    isSuccessGetSpecification,
  };
};

export default useMaterialFilter;
