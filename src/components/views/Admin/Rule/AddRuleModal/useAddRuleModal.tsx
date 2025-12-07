// useAddRuleModal.tsx
import { ToasterContext } from "@/contexts/ToasterContext";
import ruleServices from "@/services/rule.service";
import specificationServices from "@/services/specification.service";
import materialServices from "@/services/material.service";
import { IRule, IRuleForm } from "@/types/Rule";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input rule name"),
  conditions: yup
    .array()
    .of(yup.string().defined("Invalid specification"))
    .min(1, "Please select at least one specification")
    .required("Please select conditions"),
  result: yup.string().required("Please select result material"),
});

const useAddRuleModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm<IRuleForm>({ resolver: yupResolver(schema) });

  const { data: dataSpecification } = useQuery({
    queryKey: ["Specifications"],
    queryFn: () => specificationServices.getSpecifications(),
    enabled: true,
  });

  const { data: dataMaterial } = useQuery({
    queryKey: ["Materials"],
    queryFn: () => materialServices.getMaterials(),
    enabled: true,
  });

  const addRule = async (payload: IRule) => {
    const res = await ruleServices.addRule(payload);
    return res;
  };

  const {
    mutate: mutateAdd,
    isPending: isPendingMutateAdd,
    isSuccess: isSuccessMutateAdd,
  } = useMutation({
    mutationFn: addRule,
    onError: (error: any) =>
      setToaster({ type: "error", message: error?.message || "Error" }),
    onSuccess: () => {
      setToaster({ type: "success", message: "Success create rule" });
      reset();
    },
  });

  const handleAddRule = (data: IRuleForm) => {
    // shape already matches backend: { name, conditions: string[], result: string }
    mutateAdd(data as IRule);
  };

  return {
    control,
    errors,

    handleSubmitForm,
    handleAddRule,
    isPendingMutateAdd,
    isSuccessMutateAdd,

    dataSpecification,
    dataMaterial,
  };
};

export default useAddRuleModal;
