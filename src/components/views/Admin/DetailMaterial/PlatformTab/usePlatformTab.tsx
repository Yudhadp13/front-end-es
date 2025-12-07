import platformServices from "@/services/platform.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const usePlatformTab = () => {
  const { query, isReady } = useRouter();

  const getPlatformsByMaterialId = async () => {
    const { data } = await platformServices.getPlatformsByMaterialId(`${query.id}`);
    return data.data;
  };

  const {
    data: dataPlatform,
    refetch: refetchPlatform,
    isPending: isPendingPlatform,
    isRefetching: isRefetchingPlatform,
  } = useQuery({
    queryKey: ["Platforms"],
    queryFn: getPlatformsByMaterialId,
    enabled: isReady,
  });

  return {
    dataPlatform,
    refetchPlatform,
    isPendingPlatform,
    isRefetchingPlatform,
  };
};

export default usePlatformTab;
