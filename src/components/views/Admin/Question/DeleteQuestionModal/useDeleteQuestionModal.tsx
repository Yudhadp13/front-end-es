import { ToasterContext } from "@/contexts/ToasterContext";
import questionServices from "@/services/question.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteQuestionModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteQuestion = async (id: string) => {
    const res = await questionServices.deleteQuestion(id);
    return res;
  };

  const {
    mutate: mutateDeleteQuestion,
    isPending: isPendingMutateDeleteQuestion,
    isSuccess: isSuccessMutateDeleteQuestion,
  } = useMutation({
    mutationFn: deleteQuestion,
    onError: (error: any) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Delete question success" });
    },
  });

  return {
    mutateDeleteQuestion,
    isPendingMutateDeleteQuestion,
    isSuccessMutateDeleteQuestion,
  };
};

export default useDeleteQuestionModal;
