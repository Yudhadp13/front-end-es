import { ToasterContext } from "@/contexts/ToasterContext";
import platformServices from "@/services/platform.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeletePlatformModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deletePlatform = async (id: string) => {
    const res = await platformServices.deletePlatform(id);
    return res;
  };

  const {
    mutate: mutateDeletePlatform,
    isPending: isPendingMutateDeletePlatform,
    isSuccess: isSuccessMutateDeletePlatform,
  } = useMutation({
    mutationFn: deletePlatform,
    onError: (error: any) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete platform success",
      });
    },
  });

  return {
    mutateDeletePlatform,
    isPendingMutateDeletePlatform,
    isSuccessMutateDeletePlatform,
  };
};

export default useDeletePlatformModal;