import { DateValue } from "@nextui-org/react";

// =======================
// QUESTION
// =======================
interface IQuestionOption {
  label: string;
  value: string;
  specification?: string;
  nextQuestion?: string;
}

interface IQuestion {
  _id?: string;
  code?: string;
  questionText?: string;
  options?: IQuestionOption[];
}

// =======================
// PLATFORM
// =======================
interface IPlatform {
  _id?: string;
  name?: string;
  url?: string;
  materials?: string[];
}

// =======================
// MATERIAL (simple for result)
// =======================
interface IMaterialResult {
  _id?: string;
  name?: string;
  slug?: string;
  description?: string;
  banner?: string;
}

// =======================
// START SESSION RESPONSE
// =======================
interface IStartSessionResponse {
    meta: {
    status: number;
    message: string;
  };
  data: {
    sessionId: string;
  };
  question: IQuestion;
}

// =======================
// ANSWER SESSION RESPONSE
// =======================
interface IAnswerSessionResponse {
  finished: boolean;
  question?: IQuestion;
  material?: IMaterialResult | null;
  platforms?: IPlatform[];
}

// =======================
// HISTORY SESSION
// =======================
interface IQuestionHistory {
  question: string | IQuestion;
  optionLabel: string;
  optionValue: string;
}

interface IConsultationHistory {
  _id?: string;
  answers?: string[];
  currentQuestion?: string | null;
  result?: IMaterialResult | null;
  status?: string;
  questionHistory?: IQuestionHistory[];
  createdAt?: string | DateValue;
  updatedAt?: string | DateValue;
}

// =======================
// HISTORY PAGINATION RESPONSE
// =======================
interface IConsultationHistoryPagination {
  data: IConsultationHistory[];
  pagination: {
    total: number;
    totalPages: number;
    current: number;
  };
}

interface IAnswerSessionPayload {
  sessionId: string;
  optionValue: string;
}

interface ISessionDetail {
  _id?: string;
  user?: string;
  answers?: string[]; // specification ids
  currentQuestion?: IQuestion | null;
  result?: IMaterialResult | null;
  status?: string;
  questionHistory?: IQuestionHistory[];
  createdAt?: string;
  updatedAt?: string;
   platforms?: IPlatform[];
}

export type {
  IQuestion,
  IQuestionOption,
  IPlatform,
  IMaterialResult,
  IStartSessionResponse,
  IAnswerSessionResponse,
  IConsultationHistory,
  IConsultationHistoryPagination,
  IAnswerSessionPayload,
  ISessionDetail,
  IQuestionHistory,
};
