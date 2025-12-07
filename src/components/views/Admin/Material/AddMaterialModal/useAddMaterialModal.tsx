import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import specificationServices from "@/services/specification.service";
import materialServices from "@/services/material.service";
import { IMaterial } from "@/types/Material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  slug: yup.string().required("Please input slug"),
  category: yup.string().required("Please select category"),
  characteristics: yup
    .array()
    .min(1, "Please select at least one specification"),
  isPublish: yup.string().required("Please select publish status"),
  isSuperior: yup.string().required("Please select superior option"),
  description: yup.string().required("Please input description"),
  banner: yup.mixed<FileList | string>().required("Please input banner"),
});

const useAddMaterialModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("banner");
  const fileUrl = getValues("banner");

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl) => {
      if (fileUrl) setValue("banner", fileUrl);
    });
  };

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: true,
  });

  const { data: dataSpecification } = useQuery({
    queryKey: ["Specifications"],
    queryFn: () => specificationServices.getSpecifications(),
    enabled: true,
  });

  const addMaterial = async (payload: IMaterial) => {
    const res = await materialServices.addMaterial(payload);
    return res;
  };

  const {
    mutate: mutateAdd,
    isPending: isPendingMutateAdd,
    isSuccess: isSuccessMutateAdd,
  } = useMutation({
    mutationFn: addMaterial,
    onError: (error: any) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Success create material" });
      reset();
    },
  });

  const handleAddMaterial = (data: IMaterial) => {
    mutateAdd(data);
  };

  return {
    control,
    errors,
    reset,
    setValue,
    handleSubmitForm,
    handleAddMaterial,
    isPendingMutateAdd,
    isSuccessMutateAdd,

    preview,
    handleUploadBanner,
    isPendingUpload: isPendingMutateUploadFile,
    handleDeleteBanner,
    isPendingDelete: isPendingMutateDeleteFile,
    handleOnClose,

    dataCategory,
    dataSpecification,
  };
};

export default useAddMaterialModal;
