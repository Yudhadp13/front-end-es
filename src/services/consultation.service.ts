import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const consultationServices = {
  startConsultation: () =>
    instance.post(`${endpoint.CONSULTATION}/start`),

  answerConsultation: (sessionId: string, optionValue: string) =>
    instance.post(`${endpoint.CONSULTATION}/answer`, {
      sessionId,
      optionValue,
    }),

  getConsultationHistory: (params?: string) =>
    instance.get(`${endpoint.CONSULTATION}?${params || ""}`),
};

export default consultationServices;
