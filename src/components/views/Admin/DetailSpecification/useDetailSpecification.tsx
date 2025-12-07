import { ToasterContext } from "@/contexts/ToasterContext";
import specificationServices from "@/services/specification.service";
import { ISpecification } from "@/types/Specification";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailSpecification = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getSpecificationById = async () => {
    const { data } = await specificationServices.getSpecificationById(`${query.id}`);
    return data.data;
  };

  const { data: dataSpecification, refetch: refetchSpecification } = useQuery({
    queryKey: ["Specification"],
    queryFn: getSpecificationById,
    enabled: isReady,
  });

  const updateSpecification = async (payload: ISpecification) => {
    const { data } = await specificationServices.updateSpecification(
      `${query.id}`,
      payload
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateSpecification,
    isPending: isPendingMutateUpdateSpecification,
    isSuccess: isSuccessMutateUpdateSpecification,
  } = useMutation({
    mutationFn: (payload: ISpecification) => updateSpecification(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchSpecification();
      setToaster({
        type: "success",
        message: "Success update specification",
      });
    },
  });

  const handleUpdateSpecification = (data: ISpecification) =>
    mutateUpdateSpecification(data);

  return {
    dataSpecification,
    handleUpdateSpecification,
    isPendingMutateUpdateSpecification,
    isSuccessMutateUpdateSpecification,
  };
};

export default useDetailSpecification;