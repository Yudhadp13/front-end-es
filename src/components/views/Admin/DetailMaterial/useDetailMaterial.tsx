import { ToasterContext } from "@/contexts/ToasterContext";
import materialServices from "@/services/material.service";
import { IMaterial, IMaterialForm } from "@/types/Material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailMaterial = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  /* -------------------------------
   * GET MATERIAL BY ID
   * ------------------------------- */
  const getMaterialById = async () => {
    const { data } = await materialServices.getMaterialById(`${query.id}`);
    return data.data;
  };

  const {
    data: dataMaterial,
    refetch: refetchMaterial,
  } = useQuery({
    queryKey: ["Material"],
    queryFn: getMaterialById,
    enabled: isReady,
  });

  /* -------------------------------
   * UPDATE MATERIAL
   * ------------------------------- */
  const updateMaterial = async (payload: IMaterial) => {
    const { data } = await materialServices.updateMaterial(
      `${query.id}`,
      payload
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateMaterial,
    isPending: isPendingMutateUpdateMaterial,
    isSuccess: isSuccessMutateUpdateMaterial,
  } = useMutation({
    mutationFn: (payload: IMaterial) => updateMaterial(payload),
    onError: (error: any) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchMaterial();
      setToaster({
        type: "success",
        message: "Success update material",
      });
    },
  });

  const handleUpdateMaterial = (data: IMaterial) =>
    mutateUpdateMaterial(data);

  /* -------------------------------
   * UPDATE INFO TAB
   * ------------------------------- */
  const handleUpdateInfo = (data: IMaterialForm) => {
    const payload: IMaterial = {
      ...data,
      isPublish: data.isPublish,
      isSuperior: data.isSuperior,
    };

    mutateUpdateMaterial(payload);
  };


  /* -------------------------------
   * UPDATE SPECIFICATION TAB
   * ------------------------------- */
  const handleUpdateSpecification = (data: IMaterialForm) => {
    const payload: IMaterial = {
      characteristics: data.characteristics,
    };

    mutateUpdateMaterial(payload);
  };

  return {
    dataMaterial,
    handleUpdateMaterial,
    handleUpdateInfo,
    handleUpdateSpecification,
    isPendingMutateUpdateMaterial,
    isSuccessMutateUpdateMaterial,
  };
};

export default useDetailMaterial;
