import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Fragment, Key, ReactNode, useCallback, useState } from "react";
import { COLUMN_LISTS_PLATFORM } from "./PlatformTab.constants";
import usePlatformTab from "./usePlatformTab";
import AddPlatformModal from "./AddPlatformModal";
import DeletePlatformModal from "./DeletePlatformModal";
import UpdatePlatformModal from "./UpdatePlatformModal";
import { IPlatform } from "@/types/Platform";

const PlatformTab = () => {
  const { dataPlatform, refetchPlatform, isPendingPlatform, isRefetchingPlatform } =
    usePlatformTab();

  const addPlatformModal = useDisclosure();
  const deletePlatformModal = useDisclosure();
  const updatePlatformModal = useDisclosure();

  const [selectedDataPlatform, setSelectedDataPlatform] =
    useState<IPlatform | null>(null);

  const renderCell = useCallback(
    (platform: Record<string, unknown>, columnKey: Key) => {
      const cellValue = platform[columnKey as keyof typeof platform];

      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => {
                setSelectedDataPlatform(platform as IPlatform);
                updatePlatformModal.onOpen();
              }}
              onPressButtonDelete={() => {
                setSelectedDataPlatform(platform as IPlatform);
                deletePlatformModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <Fragment>
      <Card className="w-full p-4">
        <CardHeader className="items-center justify-between">
          <div className="flex flex-col items-center">
            <h1 className="w-full text-xl font-bold">Material Platform</h1>
            <p className="w-full text-small text-default-400">
              Manage platform for this material
            </p>
          </div>
          <Button color="primary" className="bg-blue-900" onPress={addPlatformModal.onOpen}>
            Add New Platform
          </Button>
        </CardHeader>
        <CardBody className="pt-0">
          <DataTable
            columns={COLUMN_LISTS_PLATFORM}
            data={dataPlatform || []}
            emptyContent="Platform is empty"
            isLoading={isPendingPlatform || isRefetchingPlatform}
            renderCell={renderCell}
            showLimit={false}
            showSearch={false}
            totalPages={1}
          />
        </CardBody>
      </Card>

      <AddPlatformModal {...addPlatformModal} refetchPlatform={refetchPlatform} />
      <DeletePlatformModal
        {...deletePlatformModal}
        selectedDataPlatform={selectedDataPlatform}
        setSelectedDataPlatform={setSelectedDataPlatform}
        refetchPlatform={refetchPlatform}
      />
      <UpdatePlatformModal
        {...updatePlatformModal}
        selectedDataPlatform={selectedDataPlatform}
        setSelectedDataPlatform={setSelectedDataPlatform}
        refetchPlatform={refetchPlatform}
      />
    </Fragment>
  );
};

export default PlatformTab;