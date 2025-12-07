import { useRouter } from "next/router";
import { useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ToasterContext } from "@/contexts/ToasterContext";

import ruleServices from "@/services/rule.service";
import specificationServices from "@/services/specification.service";
import materialServices from "@/services/material.service";

import { IRule, IRuleForm } from "@/types/Rule";

const useDetailRule = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  /* -----------------------------------
   * GET RULE BY ID
   ----------------------------------- */
  const getRuleById = async () => {
    const { data } = await ruleServices.getRuleById(String(query.id));
    return data.data;
  };

  const { data: dataRule, refetch: refetchRule } = useQuery({
    queryKey: ["Rule", query.id],
    queryFn: getRuleById,
    enabled: isReady,
  });

  /* -----------------------------------
   * GET SPECIFICATIONS
   ----------------------------------- */
  const { data: dataSpecifications } = useQuery({
    queryKey: ["Specifications"],
    queryFn: () => specificationServices.getSpecifications(),
  });

  const allSpecifications = dataSpecifications?.data?.data ?? [];

  /* -----------------------------------
   * GET MATERIALS
   ----------------------------------- */
  const { data: dataMaterials } = useQuery({
    queryKey: ["Materials"],
    queryFn: () => materialServices.getMaterials(),
  });

  const allMaterials = dataMaterials?.data?.data ?? [];

  /* -----------------------------------
   * UPDATE RULE
   ----------------------------------- */
  const updateRule = async (payload: IRule) => {
    const { data } = await ruleServices.updateRule(String(query.id), payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateRule,
    isPending: isPendingMutateUpdateRule,
    isSuccess: isSuccessMutateUpdateRule,
  } = useMutation({
    mutationFn: updateRule,
    onError: (error: any) =>
      setToaster({
        type: "error",
        message: error?.message || "Error update rule",
      }),
    onSuccess: () => {
      refetchRule();
      setToaster({
        type: "success",
        message: "Success update rule",
      });
    },
  });

  const handleUpdateRule = (data: IRuleForm) => {
    mutateUpdateRule(data);
  };

  return {
    dataRule,
    allSpecifications,
    allMaterials,

    handleUpdateRule,
    isPendingMutateUpdateRule,
    isSuccessMutateUpdateRule,
  };
};

export default useDetailRule;
