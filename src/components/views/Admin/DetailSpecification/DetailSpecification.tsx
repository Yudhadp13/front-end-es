import useDetailSpecification from "./useDetailSpecification";
import InfoTab from "./InfoTab";

const DetailSpecification = () => {
  const {
    dataSpecification,
    handleUpdateSpecification,
    isPendingMutateUpdateSpecification,
    isSuccessMutateUpdateSpecification,
  } = useDetailSpecification();

    return (
        <InfoTab
            dataSpecification={dataSpecification}
            onUpdate={handleUpdateSpecification}
            isPendingUpdate={isPendingMutateUpdateSpecification}
            isSuccessUpdate={isSuccessMutateUpdateSpecification}
        />
    );
};

export default DetailSpecification;