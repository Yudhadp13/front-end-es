import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IMaterial } from "@/types/Material";

const materialServices = {
  getMaterials: (params?: string) =>
    instance.get(`${endpoint.MATERIAL}?${params}`),

  getMaterialById: (id: string) =>
    instance.get(`${endpoint.MATERIAL}/${id}`),

  getMaterialBySlug: (slug: string) =>
    instance.get(`${endpoint.MATERIAL}/${slug}/slug`),

  addMaterial: (payload: IMaterial) =>
    instance.post(endpoint.MATERIAL, payload),

  deleteMaterial: (id: string) =>
    instance.delete(`${endpoint.MATERIAL}/${id}`),

  updateMaterial: (id: string, payload: IMaterial) =>
    instance.put(`${endpoint.MATERIAL}/${id}`, payload),

  searchSpecificationByName: (name: string) =>
    instance.get(`${endpoint.SPECIFICATION}-search?name=${name}`),

  getSpecificationById: (id: string) =>
    instance.get(`${endpoint.SPECIFICATION}/${id}`),
};

export default materialServices;
