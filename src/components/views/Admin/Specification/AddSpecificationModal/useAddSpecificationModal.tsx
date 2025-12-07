import { ToasterContext } from "@/contexts/ToasterContext";
import specificationServices from "@/services/specification.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input description"),
});

const useAddSpecificationModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const addSpecification = async (payload: any) => {
    const res = await specificationServices.addSpecification(payload);
    return res;
  };

  const {
    mutate: mutateAddSpecification,
    isPending: isPendingMutateAddSpecification,
    isSuccess: isSuccessMutateAddSpecification,
  } = useMutation({
    mutationFn: addSpecification,
    onError: (error: any) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Success add specification" });
      reset();
    },
  });

  const handleAddSpecification = (data: any) => mutateAddSpecification(data);

  const handleOnClose = (onClose: () => void) => {
    reset();
    onClose();
  };

  return {
    control,
    errors,
    handleSubmitForm,
    handleAddSpecification,
    isPendingMutateAddSpecification,
    isSuccessMutateAddSpecification,
    handleOnClose,
  };
};

export default useAddSpecificationModal;