import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ISpecification } from "@/types/Specification";

const specificationServices = {
  getSpecifications: (params?: string) => instance.get(`${endpoint.SPECIFICATION}?${params}`),

  searchSpecificationByName: (name: string) =>
    instance.get(`${endpoint.SPECIFICATION}-search?name=${name}`),

  getSpecificationById: (id: string) =>
    instance.get(`${endpoint.SPECIFICATION}/${id}`),

  addSpecification: (payload: ISpecification) =>
    instance.post(endpoint.SPECIFICATION, payload),

  deleteSpecification: (id: string) =>
    instance.delete(`${endpoint.SPECIFICATION}/${id}`),

  updateSpecification: (id: string, payload: ISpecification) =>
    instance.put(`${endpoint.SPECIFICATION}/${id}`, payload),
};

export default specificationServices;