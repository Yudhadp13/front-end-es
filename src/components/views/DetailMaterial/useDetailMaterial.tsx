import materialServices from "@/services/material.service";
import platformServices from "@/services/platform.service";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailMaterial = () => {
  const router = useRouter();

  /** ===============================
   * GET MATERIAL BY SLUG
   * =============================== */
  const getMaterialBySlug = async () => {
    const { data } = await materialServices.getMaterialBySlug(
      `${router.query.slug}`
    );
    return data.data;
  };

  const { data: dataMaterial } = useQuery({
    queryKey: ["MaterialBySlug"],
    queryFn: getMaterialBySlug,
    enabled: router.isReady,
  });

  /** ===============================
   * GET PLATFORM RELATED TO MATERIAL
   * =============================== */
  const getPlatformsByMaterial = async () => {
    const { data } = await platformServices.getPlatformsByMaterialId(
      `${dataMaterial?._id}`
    );
    return data.data;
  };

  const { data: dataPlatforms } = useQuery({
    queryKey: ["PlatformsByMaterial"],
    queryFn: getPlatformsByMaterial,
    enabled: !!dataMaterial?._id,
  });

  /** ===============================
   * GET SPECIFICATIONS RELATED
   * =============================== */
  const getSpecificationById = async () => {
    const { data } = await materialServices.getSpecificationById(
      `${dataMaterial?._id}`
    );
    return data.data;
  };

  const { data: dataSpecifications } = useQuery({
    queryKey: ["SpecificationsByMaterial"],
    queryFn: getSpecificationById,
    enabled: !!dataMaterial?._id,
  });

  return {
    dataMaterial,
    dataPlatforms,
    dataSpecifications,
  };
};

export default useDetailMaterial;
