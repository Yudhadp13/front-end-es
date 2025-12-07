import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@nextui-org/react";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_SPECIFICATION } from "./Specification.constants";
import useSpecification from "./useSpecification";
import AddSpecificationModal from "./AddSpecificationModal";
import DeleteSpecificationModal from "./DeleteSpecificationModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { useRouter } from "next/router";

const Specification = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataSpecification,
    isLoadingSpecification,
    isRefetchingSpecification,
    refetchSpecification,

    selectedId,
    setSelectedId,
  } = useSpecification();

  const addSpecificationModal = useDisclosure();
  const deleteSpecificationModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) setUrl();
  }, [isReady]);

  const renderCell = useCallback(
    (spec: Record<string, unknown>, columnKey: Key) => {
      const cellValue = spec[columnKey as keyof typeof spec];

      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/specification/${spec._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${spec._id}`);
                deleteSpecificationModal.onOpen();
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
          buttonTopContentLabel="Create Specification"
          columns={COLUMN_LISTS_SPECIFICATION}
          data={dataSpecification?.data || []}
          emptyContent="Specification is empty"
          isLoading={isLoadingSpecification || isRefetchingSpecification}
          onClickButtonTopContent={addSpecificationModal.onOpen}
          renderCell={renderCell}
          totalPages={dataSpecification?.pagination.totalPages}
        />
      )}

      {/* MODALS */}
      <AddSpecificationModal
        {...addSpecificationModal}
        refetchSpecification={refetchSpecification}
      />
      <DeleteSpecificationModal
        {...deleteSpecificationModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchSpecification={refetchSpecification}
      />
    </section>
  );
};

export default Specification;
