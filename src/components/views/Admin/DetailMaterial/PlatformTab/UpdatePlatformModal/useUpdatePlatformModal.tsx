import { ToasterContext } from "@/contexts/ToasterContext";
import platformServices from "@/services/platform.service";
import { IPlatform } from "@/types/Platform";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  url: yup.string().required("Please input url"),
  description: yup.string().required("Please input description"),
});

const useUpdatePlatformModal = (id: string) => {
    const router = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    setValue: setValueUpdatePlatform,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const updatePlatform = async (payload: IPlatform) => {
    const res = await platformServices.updatePlatform(id, payload);
    return res;
  };

  const {
    mutate: mutateUpdatePlatform,
    isPending: isPendingMutateUpdatePlatform,
    isSuccess: isSuccessMutateUpdatePlatform,
  } = useMutation({
    mutationFn: updatePlatform,
    onError: (error: any) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success update platform",
      });
      reset();
    },
  });

  const handleUpdatePlatform = (data: IPlatform) => {
    data.materials = `${router.query.id}`;
    mutateUpdatePlatform(data);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleUpdatePlatform,
    isPendingMutateUpdatePlatform,
    isSuccessMutateUpdatePlatform,
    setValueUpdatePlatform,
  };
};

export default useUpdatePlatformModal;