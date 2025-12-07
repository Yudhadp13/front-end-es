import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_MATERIAL } from "./Material.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import useMaterial from "./useMaterial";
import DropdownAction from "@/components/commons/DropdownAction";
import MaterialModal from "./AddMaterialModal";
import DeleteMaterialModal from "./DeleteMaterialModal";

const Material = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataMaterials,
    isLoadingMaterials,
    isRefetchingMaterials,
    refetchMaterials,

    selectedId,
    setSelectedId,
  } = useMaterial();

  const { setUrl } = useChangeUrl();

  const addMaterialModal = useDisclosure();
  const deleteMaterialModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
        setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (material: Record<string, unknown>, columnKey: Key) => {
      const cellValue = material[columnKey as keyof typeof material];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              className="aspect-square w-16 rounded-lg object-cover"
              src={`${cellValue}`}
              alt="icon"
              width={200}
              height={200}
            />
          );
        case "isPublish":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "Publish" : "Not Publish"}
            </Chip>
          );
          case "specification": {
              const specs = material.characteristics as any[];

              if (!specs || specs.length === 0) {
                return <Chip size="sm" variant="flat">-</Chip>;
              }

              return (
                <div className="flex flex-wrap gap-1">
                  {specs.map((item, idx) => (
                    <Chip key={idx} size="sm" color="primary" variant="flat">
                      {item.name}
                    </Chip>
                  ))}
                </div>
              );
            }
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/material/${material._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${material._id}`);
                deleteMaterialModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push]
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Material"
          columns={COLUMN_LISTS_MATERIAL}
          data={dataMaterials?.data || []}
          emptyContent="Material is empty"
          isLoading={isLoadingMaterials || isRefetchingMaterials}
          onClickButtonTopContent={addMaterialModal.onOpen}
          renderCell={renderCell}
          totalPages={dataMaterials?.pagination.totalPages}
        />
      )}
      <MaterialModal {...addMaterialModal} refetchMaterials={refetchMaterials} />
      <DeleteMaterialModal
        {...deleteMaterialModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchMaterials={refetchMaterials}
      />
    </section>
  );
};

export default Material;