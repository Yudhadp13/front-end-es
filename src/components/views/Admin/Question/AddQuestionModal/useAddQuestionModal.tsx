// components/Question/AddQuestionModal/useAddQuestionModal.tsx
import { ToasterContext } from "@/contexts/ToasterContext";
import questionServices from "@/services/question.service";
import specificationServices from "@/services/specification.service";
import { IQuestionForm } from "@/types/Question";
import { useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

/**
 * Schema expects:
 *  - code: string
 *  - questionText: string
 *  - isFirst: string ('true' | 'false')
 *  - options: array of objects { label, value, specification (id), nextQuestion? }
 */
export const questionFormSchema = yup.object({
  code: yup.string().required(),
  questionText: yup.string().required(),
  isFirst: yup.string().required(),
  options: yup.array()
    .of(
      yup.object({
        label: yup.string().required(),
        value: yup.string().required(),
        specification: yup.string().required(), // STRING ONLY
        nextQuestion: yup.string().nullable(),
      })
    )
    .min(1)
    .required(),
});

const useAddQuestionModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IQuestionForm>({
    resolver: yupResolver(questionFormSchema),
    defaultValues: {
      code: "",
      questionText: "",
      isFirst: "false",
      options: [{ label: "", value: "", specification: "", nextQuestion: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const { data: dataSpecification } = useQuery({
    queryKey: ["Specifications"],
    queryFn: () => specificationServices.getSpecifications(),
    enabled: true,
  });

  // Also fetch questions for nextQuestion choices (so user can link to another question)
  const { data: dataQuestions } = useQuery({
    queryKey: ["QuestionsForAutocomplete"],
    queryFn: () => questionServices.getQuestions(),
    enabled: true,
  });

  const addQuestion = async (payload: IQuestionForm) => {
    // Convert isFirst to boolean and options.nextQuestion null strings to null
    const body = {
      code: payload.code,
      questionText: payload.questionText,
      isFirst: payload.isFirst === "true",
      options: payload.options.map((opt) => ({
        label: opt.label,
        value: opt.value,
        specification: opt.specification,
        nextQuestion: opt.nextQuestion ? opt.nextQuestion : null,
      })),
    };
    const res = await questionServices.addQuestion(body as any);
    return res;
  };

  const { mutate: mutateAdd, isPending: isPendingMutateAdd, isSuccess: isSuccessMutateAdd } =
    useMutation({
      mutationFn: addQuestion,
      onError: (error: any) => {
        setToaster({ type: "error", message: error?.message || "Error create question" });
      },
      onSuccess: () => {
        setToaster({ type: "success", message: "Success create question" });
        reset();
      },
    });

  const handleAddQuestion = (data: IQuestionForm) => {
    mutateAdd(data);
  };

  return {
    control,
    errors,
    handleSubmitForm: handleSubmit,
    handleAddQuestion,
    isPendingMutateAdd,
    isSuccessMutateAdd,
    fields,
    appendOption: () => append({ label: "", value: "", specification: "", nextQuestion: null }),
    removeOption: (index: number) => remove(index),

    dataSpecification,
    dataQuestions,
  };
};

export default useAddQuestionModal;
