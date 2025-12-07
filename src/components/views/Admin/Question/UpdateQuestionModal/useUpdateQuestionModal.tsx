// components/views/Admin/Question/UpdateQuestionModal/useUpdateQuestionModal.tsx
import { ToasterContext } from "@/contexts/ToasterContext";
import questionServices from "@/services/question.service";
import specificationServices from "@/services/specification.service";
import { IQuestion, IQuestionForm } from "@/types/Question";
import { useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/**
 * SAME schema as AddQuestion
 */
export const updateQuestionSchema = yup.object({
  code: yup.string().required(),
  questionText: yup.string().required(),
  isFirst: yup.string().required(),
  options: yup
    .array()
    .of(
      yup.object({
        label: yup.string().required(),
        value: yup.string().required(),
        specification: yup.string().required(),
        nextQuestion: yup.string().nullable(),
      })
    )
    .min(1)
    .required(),
});

const useUpdateQuestionModal = (id: string) => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    setValue: setValueUpdateQuestion,
  } = useForm<IQuestionForm>({
    resolver: yupResolver(updateQuestionSchema),
    defaultValues: {
      code: "",
      questionText: "",
      isFirst: "false",
      options: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  /**
   * Fetch specifications
   */
  const { data: dataSpecification } = useQuery({
    queryKey: ["Specifications"],
    queryFn: () => specificationServices.getSpecifications(),
  });

  /**
   * Fetch questions (for nextQuestion selector)
   */
  const { data: dataQuestions } = useQuery({
    queryKey: ["QuestionsForAutocomplete"],
    queryFn: () => questionServices.getQuestions(),
  });

  /**
   * UPDATE REQUEST
   */
  const updateQuestion = async (payload: IQuestionForm) => {
    const body: IQuestion = {
      code: payload.code,
      questionText: payload.questionText,
      isFirst: payload.isFirst === "true",
      options: payload.options.map((opt) => ({
        label: opt.label,
        value: opt.value,
        specification: opt.specification,
        nextQuestion: !opt.nextQuestion || opt.nextQuestion === "null" ? null : opt.nextQuestion,
      })),
    };

    const res = await questionServices.updateQuestion(id, body);
    return res;
  };

  const {
    mutate: mutateUpdateQuestion,
    isPending: isPendingMutateUpdateQuestion,
    isSuccess: isSuccessMutateUpdateQuestion,
  } = useMutation({
    mutationFn: updateQuestion,
    onError: (error: any) => {
      setToaster({
        type: "error",
        message: error?.message || "Error updating question",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success update question",
      });
      reset();
    },
  });

  const handleUpdateQuestion = (data: IQuestionForm) => {
    mutateUpdateQuestion(data);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleUpdateQuestion,
    isPendingMutateUpdateQuestion,
    isSuccessMutateUpdateQuestion,

    setValueUpdateQuestion,

    fields,
    appendOption: () =>
      append({ label: "", value: "", specification: "", nextQuestion: null }),
    removeOption: (index: number) => remove(index),

    dataSpecification,
    dataQuestions,
  };
};

export default useUpdateQuestionModal;
