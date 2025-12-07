import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IRule } from "@/types/Rule";

const ruleServices = {
  getRules: (params?: string) => instance.get(`${endpoint.RULE}?${params}`),
  getRuleById: (id: string) => instance.get(`${endpoint.RULE}/${id}`),
  addRule: (payload: IRule) => instance.post(endpoint.RULE, payload),
  deleteRule: (id: string) => instance.delete(`${endpoint.RULE}/${id}`),
  updateRule: (id: string, payload: IRule) =>
    instance.put(`${endpoint.RULE}/${id}`, payload),
};

export default ruleServices;
