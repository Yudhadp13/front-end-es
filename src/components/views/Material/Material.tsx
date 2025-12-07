import { IMaterial } from "@/types/Material";
import useMaterial from "./useMaterial";
import CardMaterial from "@/components/ui/CardMaterial";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import MaterialFooter from "./MaterialFooter";
import MaterialFilter from "./MaterialFilter";
import Image from "next/image";

const Material = () => {
  const router = useRouter();
  const { dataMaterials, isLoadingMaterials, isRefetchingMaterials } = useMaterial();
  const { setUrlExplore } = useChangeUrl();

  useEffect(() => {
    if (router.isReady) {
      setUrlExplore();
    }
  }, [router.isReady]);
  return (
    <div className="flex w-full flex-col justify-center gap-6 px-4 lg:flex-row lg:px-0">
      <MaterialFilter />
      <div className="min-h-[70vh] w-full flex-1">
        <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!isLoadingMaterials && !isRefetchingMaterials
            ? dataMaterials?.data?.map((material: IMaterial) => (
                <CardMaterial material={material} key={`card-material-${material._id}`} />
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <CardMaterial
                  key={`card-material-loading-${index}`}
                  isLoading={true}
                />
              ))}
        </div>

        {!isLoadingMaterials && dataMaterials?.data?.length > 0 && (
          <MaterialFooter totalPages={dataMaterials?.pagination?.totalPages} />
        )}

        {dataMaterials?.data?.length < 1 &&
          !isLoadingMaterials &&
          !isRefetchingMaterials && (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <Image
                src="/images/illustrations/no-data.png"
                alt="no-data"
                width={200}
                height={200}
              />
              <h2 className="text-center text-2xl font-bold text-primaryBlue">
                Material not found
              </h2>
            </div>
          )}
      </div>
    </div>
  );
};

export default Material;
