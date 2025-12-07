import useChangeUrl from "@/hooks/useChangeUrl";
import specificationServices from "@/services/specification.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useSpecification = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getSpecifications = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) params += `&search=${currentSearch}`;

    const res = await specificationServices.getSpecifications(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataSpecification,
    isLoading: isLoadingSpecification,
    isRefetching: isRefetchingSpecification,
    refetch: refetchSpecification,
  } = useQuery({
    queryKey: ["Specifications", currentPage, currentLimit, currentSearch],
    queryFn: () => getSpecifications(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataSpecification,
    isLoadingSpecification,
    isRefetchingSpecification,
    refetchSpecification,

    selectedId,
    setSelectedId,
  };
};

export default useSpecification;