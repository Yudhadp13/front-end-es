// services/question.service.ts
import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IQuestion } from "@/types/Question";

const questionServices = {
  getQuestions: (params?: string) =>
    instance.get(`${endpoint.QUESTION}?${params}`),
  getQuestionById: (id: string) => instance.get(`${endpoint.QUESTION}/${id}`),
  addQuestion: (payload: IQuestion) => instance.post(endpoint.QUESTION, payload),
  deleteQuestion: (id: string) => instance.delete(`${endpoint.QUESTION}/${id}`),
  updateQuestion: (id: string, payload: IQuestion) =>
    instance.put(`${endpoint.QUESTION}/${id}`, payload),
};

export default questionServices;
