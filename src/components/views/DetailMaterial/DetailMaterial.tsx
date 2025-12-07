import {
  BreadcrumbItem,
  Breadcrumbs,
  Skeleton,
  Tab,
  Tabs,
  Card,
} from "@nextui-org/react";
import Image from "next/image";

import useDetailMaterial from "./useDetailMaterial";
import DetailMaterialPlatform from "./DetailMaterialPlatform";
import { MdOutlineRecommend } from "react-icons/md";
import { VscTag } from "react-icons/vsc";
import { FaBattleNet } from "react-icons/fa6";

const DetailMaterial = () => {
  const {
    dataMaterial,
    dataPlatforms,
    dataSpecifications,
  } = useDetailMaterial();

  const handleOpenLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="px-8 md:px-0">
      <Skeleton className="h-6 w-1/4 rounded-lg" isLoaded={!!dataMaterial?.name}>
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/material">Material</BreadcrumbItem>
          <BreadcrumbItem>{dataMaterial?.name}</BreadcrumbItem>
        </Breadcrumbs>
      </Skeleton>

      <section className="mt-4 flex flex-col gap-10 lg:flex-row">
        {/* LEFT CONTENT */}
        <div className="w-full lg:w-4/6">
          <Skeleton
            isLoaded={!!dataMaterial?.name}
            className="mb-2 h-8 rounded-lg"
          >
            <h1 className="text-2xl font-semibold text-primary">
              {dataMaterial?.name}
            </h1>
          </Skeleton>
          
        <Skeleton
          className="mb-2 h-6 w-1/2 rounded-lg"
          isLoaded={!!dataMaterial?.category}
            >
           <div className="flex items-center gap-2 text-foreground-500">            
             <VscTag width={16} />
                <p>{dataMaterial?.category?.name}</p>
          </div>
        </Skeleton>

        {dataMaterial?.isSuperior && (
        <Skeleton
            className="mb-2 h-6 w-1/2 rounded-lg"
            isLoaded={dataMaterial?.isSuperior !== undefined}
        >
            <div className="flex items-center gap-2 text-foreground-500">
            <MdOutlineRecommend width={16} />
            <p>Best Material</p>
            </div>
        </Skeleton>
        )}

          <Skeleton
          className="mb-2 h-6 w-1/2 rounded-lg"
          isLoaded={!!dataMaterial?.characteristics}
            >
           <div className="flex items-center gap-2 text-foreground-500">            
             <FaBattleNet width={16} />
                <p>
                {dataMaterial?.characteristics
                    ?.map((item: any) => item.name)
                    .join(", ")}
                </p>
          </div>
        </Skeleton>

            <Skeleton
            className="mb-4 aspect-video w-full"
            isLoaded={!!dataMaterial?.banner}
          >
            <Image
              alt="cover"
              src={dataMaterial?.banner && dataMaterial?.banner}
              className="aspect-video w-full rounded-lg object-cover"
              width={1920}
              height={1080}
            />
          </Skeleton>

          <Tabs aria-label="Tab Detail Material" fullWidth className="mt-6">
            {/* DESCRIPTION */}
            <Tab key="Description" title="Description">
              <Card className="p-4">
                <h2 className="text-xl font-semibold text-foreground-700">
                  Deskripsi Material
                </h2>
                <p className="mt-2 text-foreground-500">
                  {dataMaterial?.description}
                </p>
              </Card>
            </Tab>

            {/* PLATFORM */}
            <Tab key="Platform" title="Platform">
              <h2 className="text-xl font-semibold text-foreground-700">
                Platform Pembelian
              </h2>

              <div className="mt-2 flex flex-col gap-8">
                {dataPlatforms?.length > 0 ? (
                  dataPlatforms.map((p: any) => (
                    <DetailMaterialPlatform
                      key={`platform-${p._id}`}
                      platform={p}
                      handleOpenLink={handleOpenLink}
                    />
                  ))
                ) : (
                  <p className="text-sm text-foreground-500">
                    Tidak ada platform terkait.
                  </p>
                )}
              </div>
            </Tab>
          </Tabs>
        </div>

        {/* RIGHT CONTENT – bisa kosong dulu / tambahkan sesuatu nanti */}
        <div className="w-full lg:w-2/6">
          {/* Optional section seperti cart atau rekomendasi */}
        </div>
      </section>
    </div>
  );
};

export default DetailMaterial;
