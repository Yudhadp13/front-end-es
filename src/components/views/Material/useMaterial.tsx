import useChangeUrl from "@/hooks/useChangeUrl";
import materialServices from "@/services/material.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useMaterial = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>("");
  const {
    currentLimit,
    currentPage,
    currentCategory,
    currentSpecification,
    currentIsSuperior,
  } = useChangeUrl();

  const getMaterials = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}&isPublish=true&category=${currentCategory}&isPublish=true&characteristics=${currentSpecification}&isSuperior=${currentIsSuperior}`;
    const res = await materialServices.getMaterials(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataMaterials,
    isLoading: isLoadingMaterials,
    isRefetching: isRefetchingMaterials,
    refetch: refetchMaterials,
  } = useQuery({
    queryKey: [
      "Materials",
      currentPage,
      currentLimit,
      currentCategory,
      currentSpecification,
      currentIsSuperior,
    ],
    queryFn: () => getMaterials(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataMaterials,
    isLoadingMaterials,
    isRefetchingMaterials,
    refetchMaterials,
    selectedId,
    setSelectedId,
  };
};

export default useMaterial;
