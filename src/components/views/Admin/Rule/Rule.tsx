import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@nextui-org/react";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_RULE } from "./Rule.constants";
import useRule from "./useRule";
import AddRuleModal from "./AddRuleModal";
import DeleteRuleModal from "./DeleteRuleModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { useRouter } from "next/router";

const Rule = () => {
  const { push, isReady, query } = useRouter();

  const {
    dataRule,
    isLoadingRule,
    isRefetchingRule,
    refetchRule,
    selectedId,
    setSelectedId,
  } = useRule();

  const addRuleModal = useDisclosure();
  const deleteRuleModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) setUrl();
  }, [isReady]);
  
const renderCell = useCallback(
  (rule: any, columnKey: Key) => {
    const cellValue = rule[columnKey as keyof typeof rule];

    switch (columnKey) {
        case "conditions": {
        if (!Array.isArray(rule.conditions) || rule.conditions.length === 0) {
            return <Chip size="sm" variant="flat">-</Chip>;
        }

        return (
            <div className="flex flex-wrap gap-1">
            {rule.conditions.map((c: any, idx: number) => (
                <Chip key={idx} size="sm" color="primary" variant="flat">
                {c.name}
                </Chip>
            ))}
            </div>
        );
        }

        case "result": {
        if (!rule.result) {
            return <Chip size="sm" variant="flat">-</Chip>;
        }

        return (
            <Chip size="sm" color="success" variant="flat">
            {rule.result.name}
            </Chip>
        );
        }

      case "actions":
        return (
          <DropdownAction
            onPressButtonDetail={() => push(`/admin/rule/${rule._id}`)}
            onPressButtonDelete={() => {
              setSelectedId(rule._id);
              deleteRuleModal.onOpen();
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
          buttonTopContentLabel="Create Rule"
          columns={COLUMN_LISTS_RULE}
          data={dataRule?.data || []}
          emptyContent="Rule is empty"
          isLoading={isLoadingRule || isRefetchingRule}
          onClickButtonTopContent={addRuleModal.onOpen}
          renderCell={renderCell}
          totalPages={dataRule?.pagination.totalPages}
        />
      )}

      {/* MODALS */}
      <AddRuleModal {...addRuleModal} refetchRules={refetchRule} />
      <DeleteRuleModal
        {...deleteRuleModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchRule={refetchRule}
      />
    </section>
  );
};

export default Rule;
