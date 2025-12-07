import useChangeUrl from "@/hooks/useChangeUrl";
import questionServices from "@/services/question.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useQuestion = () => {
  const [selectedId, setSelectedId] = useState<string>("");

  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getQuestions = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) params += `&search=${currentSearch}`;

    const res = await questionServices.getQuestions(params);
    return res.data;
  };

  const {
    data: dataQuestion,
    isLoading: isLoadingQuestion,
    isRefetching: isRefetchingQuestion,
    refetch: refetchQuestion,
  } = useQuery({
    queryKey: ["Questions", currentPage, currentLimit, currentSearch],
    queryFn: () => getQuestions(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataQuestion,
    isLoadingQuestion,
    isRefetchingQuestion,
    refetchQuestion,
    selectedId,
    setSelectedId,
  };
};

export default useQuestion;
