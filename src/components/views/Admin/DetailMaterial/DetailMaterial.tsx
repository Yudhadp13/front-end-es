import { Tab, Tabs } from "@nextui-org/react";
import CoverTab from "./CoverTab";
import InfoTab from "./InfoTab";
import PlatformTab from "./PlatformTab";
import SpecificationTab from "./SpecificationTab";
import useDetailMaterial from "./useDetailMaterial";

const DetailMaterial = () => {
  const {
    dataMaterial,
    handleUpdateMaterial,
    handleUpdateInfo,
    handleUpdateSpecification,
    isPendingMutateUpdateMaterial,
    isSuccessMutateUpdateMaterial,
  } = useDetailMaterial();

  return (
    <Tabs aria-label="Options">

      <Tab key="cover" title="Cover">
        <CoverTab
          currentCover={dataMaterial?.banner}
          onUpdate={handleUpdateMaterial}
          isPendingUpdate={isPendingMutateUpdateMaterial}
          isSuccessUpdate={isSuccessMutateUpdateMaterial}
        />
      </Tab>

      <Tab key="info" title="Info">
        <InfoTab
          dataMaterial={dataMaterial}
          onUpdate={handleUpdateInfo}
          isPendingUpdate={isPendingMutateUpdateMaterial}
          isSuccessUpdate={isSuccessMutateUpdateMaterial}
        />
      </Tab>

      <Tab key="specification" title="Specifications">
        <SpecificationTab
          dataMaterial={dataMaterial}
          onUpdate={handleUpdateSpecification}
          isPendingUpdate={isPendingMutateUpdateMaterial}
          isSuccessUpdate={isSuccessMutateUpdateMaterial}
        />
      </Tab>

      <Tab key="platform" title="Platform">
        <PlatformTab/>
      </Tab>
    </Tabs>
  );
};

export default DetailMaterial;
