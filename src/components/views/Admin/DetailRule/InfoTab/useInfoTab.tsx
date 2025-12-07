import { useForm } from "react-hook-form";
import { IRuleFormUpdate } from "@/types/Rule";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validation schema – sama seperti AddRuleModal
const schema = yup.object().shape({
  name: yup.string().required("Please input rule name"),
  conditions: yup
    .array()
    .of(yup.string().defined("Invalid specification"))
    .min(1, "Please select at least one specification"),
  result: yup.string().required("Please select result material"),
});

const useInfoTab = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IRuleFormUpdate>({
    resolver: yupResolver(schema),
  });

  return {
    control,
    errors,
    handleSubmit,
    reset,
    setValue,
  };
};

export default useInfoTab;
