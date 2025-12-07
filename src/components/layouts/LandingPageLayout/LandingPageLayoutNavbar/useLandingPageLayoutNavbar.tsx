import { DELAY, LIMIT_MATERIAL, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import authServices from "@/services/auth.service";
import materialServices from "@/services/material.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const useLandingPageLayoutNavbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debounce = useDebounce();
  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: router.isReady,
  });

  const getMaterialsSearch = async () => {
    const params = `search=${search}&limit=${LIMIT_MATERIAL}&page=${PAGE_DEFAULT}&isPublish=true`;
    const res = await materialServices.getMaterials(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataMaterialsSearch,
    isLoading: isLoadingMaterialsSearch,
    isRefetching: isRefetchingMaterialsSearch,
  } = useQuery({
    queryKey: ["MaterialsSearch", search],
    queryFn: getMaterialsSearch,
    enabled: !!search,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => setSearch(e.target.value), DELAY);
  };

  return {
    dataProfile,

    dataMaterialsSearch,
    isLoadingMaterialsSearch,
    isRefetchingMaterialsSearch,
    handleSearch,
    search,
    setSearch,
  };
};

export default useLandingPageLayoutNavbar;
