import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IPlatform } from "@/types/Platform";

const platformServices = {
  getPlatforms: () => instance.get(endpoint.PLATFORM),

  getPlatformById: (id: string) =>
    instance.get(`${endpoint.PLATFORM}/${id}`),

  getPlatformsByMaterialId: (materialId: string) =>
    instance.get(`${endpoint.PLATFORM}/${materialId}/materials`),

  addPlatform: (payload: IPlatform) =>
    instance.post(endpoint.PLATFORM, payload),

  deletePlatform: (id: string) =>
    instance.delete(`${endpoint.PLATFORM}/${id}`),

  updatePlatform: (id: string, payload: IPlatform) =>
    instance.put(`${endpoint.PLATFORM}/${id}`, payload),
};

export default platformServices;
