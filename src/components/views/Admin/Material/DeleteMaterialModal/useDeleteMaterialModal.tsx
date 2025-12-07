import { ToasterContext } from "@/contexts/ToasterContext";
import materialServices from "@/services/material.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteMaterialModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteMaterial = async (id: string) => {
    const res = await materialServices.deleteMaterial(id);
    return res;
  };

  const {
    mutate: mutateDeleteMaterial,
    isPending: isPendingMutateDeleteMaterial,
    isSuccess: isSuccessMutateDeleteMaterial,
  } = useMutation({
    mutationFn: deleteMaterial,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete material success",
      });
    },
  });

  return {
    mutateDeleteMaterial,
    isPendingMutateDeleteMaterial,
    isSuccessMutateDeleteMaterial,
  };
};

export default useDeleteMaterialModal;
