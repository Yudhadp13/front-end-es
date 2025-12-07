import { ToasterContext } from "@/contexts/ToasterContext";
import ruleServices from "@/services/rule.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteRuleModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteRule = async (id: string) => {
    const res = await ruleServices.deleteRule(id);
    return res;
  };

  const {
    mutate: mutateDeleteRule,
    isPending: isPendingMutateDeleteRule,
    isSuccess: isSuccessMutateDeleteRule,
  } = useMutation({
    mutationFn: deleteRule,
    onError: (error: any) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Delete rule success" });
    },
  });

  return {
    mutateDeleteRule,
    isPendingMutateDeleteRule,
    isSuccessMutateDeleteRule,
  };
};

export default useDeleteRuleModal;
