import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import specificationServices from "@/services/specification.service";

const schema = yup.object().shape({
  characteristics: yup
    .array()
    .min(1, "Please select at least one specification"),
});

const useSpecificationTab = () => {
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors, isValid },
    reset: resetForm,
    setValue: setValueForm,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // ⬅ untuk validasi realtime
  });

  // Ambil semua specification
  const { data: dataSpecification } = useQuery({
    queryKey: ["Specifications"],
    queryFn: () => specificationServices.getSpecifications(),
    enabled: true,
  });

  return {
    control,
    errors,
    isValid,
    trigger,
    handleSubmitForm,
    resetForm,
    setValueForm,
    dataSpecification,
  };
};

export default useSpecificationTab;
