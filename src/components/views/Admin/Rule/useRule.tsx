import useChangeUrl from "@/hooks/useChangeUrl";
import ruleServices from "@/services/rule.service"; 
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useRule = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getRules = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) params += `&search=${currentSearch}`;

    const res = await ruleServices.getRules(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataRule,
    isLoading: isLoadingRule,
    isRefetching: isRefetchingRule,
    refetch: refetchRule,
  } = useQuery({
    queryKey: ["Rules", currentPage, currentLimit, currentSearch],
    queryFn: () => getRules(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataRule,
    isLoadingRule,
    isRefetchingRule,
    refetchRule,
    selectedId,
    setSelectedId,
  };
};

export default useRule;
