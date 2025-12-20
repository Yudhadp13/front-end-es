import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

import {
  IStartSessionResponse,
  IAnswerSessionResponse,
  IConsultationHistoryPagination,
  ISessionDetail,
} from "@/types/Consultation";

const consultationServices = {
  // mulai sesi baru
  startSession: () =>
    instance.post<IStartSessionResponse>(`${endpoint.CONSULTATION}/start`),

  // jawaban pertanyaan
  answerQuestion: (sessionId: string, optionValue: string) =>
    instance.post<any>(`${endpoint.CONSULTATION}/answer`, {
      sessionId,
      optionValue,
    }),

  // ambil data history dari pagination
  getHistory: (params?: string) =>
      instance.get(`${endpoint.CONSULTATION}?${params || ""}`),

  getSessionDetail: (sessionId: string) =>
    instance.get<any>(`${endpoint.CONSULTATION}/${sessionId}`),
};

export default consultationServices;
