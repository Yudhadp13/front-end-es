import { ToasterContext } from "@/contexts/ToasterContext";
import specificationServices from "@/services/specification.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteSpecificationModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteSpecification = async (id: string) => {
    const res = await specificationServices.deleteSpecification(id);
    return res;
  };

  const {
    mutate: mutateDeleteSpecification,
    isPending: isPendingMutateDeleteSpecification,
    isSuccess: isSuccessMutateDeleteSpecification,
  } = useMutation({
    mutationFn: deleteSpecification,
    onError: (error: any) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Delete specification success" });
    },
  });

  return {
    mutateDeleteSpecification,
    isPendingMutateDeleteSpecification,
    isSuccessMutateDeleteSpecification,
  };
};

export default useDeleteSpecificationModal;
