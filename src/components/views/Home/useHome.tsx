import {
  LIMIT_BANNER,
  LIMIT_CATEGORY,
  LIMIT_MATERIAL,
  PAGE_DEFAULT,
} from "@/constants/list.constants";
import bannerServices from "@/services/banner.service";
import categoryServices from "@/services/category.service";
import materialServices from "@/services/material.service";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const getBanners = async () => {
    let params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;
    const res = await bannerServices.getBanners(params);
    const { data } = res;
    return data;
  };

  const { data: dataBanners, isLoading: isLoadingBanners } = useQuery({
    queryKey: ["Banners"],
    queryFn: getBanners,
  });

  const getCategories = async () => {
    let params = `limit=${LIMIT_CATEGORY}&page=${PAGE_DEFAULT}`;
    const res = await categoryServices.getCategories(params);
    const { data } = res;
    return data;
  };

  const { data: dataCategories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
  });

  const getMaterials = async (params: string) => {
    const res = await materialServices.getMaterials(params);
    const { data } = res;
    return data;
  };

  const currentMaterialQuery = `limit=${LIMIT_MATERIAL}&page=${PAGE_DEFAULT}&isPublish=true`;

  const { data: dataSuperiorMaterials, isLoading: isLoadingSuperiorMaterials } =
    useQuery({
      queryKey: ["SuperiorMaterials"],
      queryFn: () => getMaterials(`${currentMaterialQuery}&isSuperior=true`),
    });

  const { data: dataLatestMaterials, isLoading: isLoadingLatestMaterials } = useQuery(
    {
      queryKey: ["LatestMaterials"],
      queryFn: () => getMaterials(currentMaterialQuery),
    },
  );

  return {
    dataBanners,
    isLoadingBanners,
    dataSuperiorMaterials,
    isLoadingSuperiorMaterials,
    dataLatestMaterials,
    isLoadingLatestMaterials,
    dataCategories,
    isLoadingCategories,
  };
};

export default useHome;
