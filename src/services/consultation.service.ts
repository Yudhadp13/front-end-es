import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

import {
  IStartSessionResponse,
  IAnswerSessionResponse,
  IConsultationHistoryPagination,
  ISessionDetail,
} from "@/types/Consultation";

const consultationServices = {
  // =========================
  // START NEW SESSION
  // =========================
  startSession: () =>
    instance.post<IStartSessionResponse>(`${endpoint.CONSULTATION}/start`),

  // =========================
  // ANSWER QUESTION
  // =========================
  answerQuestion: (sessionId: string, optionValue: string) =>
    instance.post<any>(`${endpoint.CONSULTATION}/answer`, {
      sessionId,
      optionValue,
    }),

  // =========================
  // GET HISTORY WITH PAGINATION
  // =========================
  getHistory: (params?: string) =>
      instance.get(`${endpoint.CONSULTATION}?${params || ""}`),

    // GET /consultation/:id  <-- IMPORTANT for robust QuestionFlow
  getSessionDetail: (sessionId: string) =>
    instance.get<any>(`${endpoint.CONSULTATION}/${sessionId}`),
};

export default consultationServices;
