import { Tab, Tabs } from "@nextui-org/react";
import useDetailCategory from "./useDetailCategory";
import InfoTab from "./InfoTab";
import IconTab from "./IconTab";

const DetailCategory = () => {
  const {
    dataCategory,
    handleUpdateCategory,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  } = useDetailCategory();
  return (
    <Tabs aria-label="Options">
      <Tab key="icon" title="Icon">
        <IconTab
          currentIcon={dataCategory?.icon}
          onUpdate={handleUpdateCategory}
          isPendingUpdate={isPendingMutateUpdateCategory}
          isSuccessUpdate={isSuccessMutateUpdateCategory}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataCategory={dataCategory}
          onUpdate={handleUpdateCategory}
          isPendingUpdate={isPendingMutateUpdateCategory}
          isSuccessUpdate={isSuccessMutateUpdateCategory}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailCategory;
