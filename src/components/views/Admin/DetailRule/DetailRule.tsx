import { Tabs, Tab } from "@nextui-org/react";
import InfoTab from "./InfoTab";
import useDetailRule from "./useDetailRule";

const DetailRule = () => {
  const {
    dataRule,
    allSpecifications,
    allMaterials,

    handleUpdateRule,
    isPendingMutateUpdateRule,
    isSuccessMutateUpdateRule,
  } = useDetailRule();

  if (!dataRule) return null;

  return (
    <div className="w-full">
      <InfoTab
        dataRule={dataRule}
        allSpecifications={allSpecifications}
        allMaterials={allMaterials}
        onUpdate={handleUpdateRule}
        isPendingUpdate={isPendingMutateUpdateRule}
        isSuccessUpdate={isSuccessMutateUpdateRule}
      />
    </div>
  );
};

export default DetailRule;
