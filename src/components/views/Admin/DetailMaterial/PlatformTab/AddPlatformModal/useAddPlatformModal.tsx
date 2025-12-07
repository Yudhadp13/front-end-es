import { ToasterContext } from "@/contexts/ToasterContext";
import platformServices from "@/services/platform.service";
import { IPlatform } from "@/types/Platform";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input description"),
  url: yup.string().required("Please input url"),
});

const useAddPlatformModal = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addPlatform = async (payload: IPlatform) => {
    const res = await platformServices.addPlatform(payload);
    return res;
  };

  const {
    mutate: mutateAddPlatform,
    isPending: isPendingMutateAddPlatform,
    isSuccess: isSuccessMutateAddPlatform,
  } = useMutation({
    mutationFn: addPlatform,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add platform",
      });
      reset();
    },
  });

  const handleAddPlatform = (data: IPlatform) => {
    data.materials = `${router.query.id}`;
    mutateAddPlatform(data);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddPlatform,
    isPendingMutateAddPlatform,
    isSuccessMutateAddPlatform,
  };
};

export default useAddPlatformModal;