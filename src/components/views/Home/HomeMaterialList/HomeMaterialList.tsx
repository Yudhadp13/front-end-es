import CardMaterial from "@/components/ui/CardMaterial";
import { IMaterial } from "@/types/Material";
import Link from "next/link";

interface PropTypes {
  title: string;
  materials: IMaterial[];
  isLoading: boolean;
  urlMore?: string;
}

const HomeMaterialList = (props: PropTypes) => {
  const { title, materials, isLoading, urlMore = "/material" } = props;
  return (
    <section className="mb-16">
      <div className="mb-2 flex items-center justify-between px-6 lg:px-0">
        <h2 className="text-2xl font-bold text-primaryBlue">{title}</h2>
        <Link href={urlMore} className="font-semibold text-foreground-500">
          See More
        </Link>
      </div>
      <div className="grid auto-cols-[20rem] grid-flow-col gap-6 overflow-x-auto py-2 pb-4 lg:grid-cols-4 lg:px-1">
        {!isLoading
          ? materials?.map((material) => (
              <CardMaterial
                material={material}
                key={`card-material-${material._id}`}
                className="first:ml-6 last:mr-6 lg:first:ml-0 lg:last:mr-0"
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <CardMaterial
                key={`card-material-loading-${index}`}
                isLoading={isLoading}
                className="first:ml-6 last:mr-6 lg:first:ml-0 lg:last:mr-0"
              />
            ))}
      </div>
    </section>
  );
};

export default HomeMaterialList;
