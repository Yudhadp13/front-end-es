import { ISpecification } from "./Specification";

export interface IQuestionOption {
  label: string;
  value: string;
  specification: string | ISpecification; // response API bisa object
  nextQuestion?: string | null | IQuestion;
}

export interface IQuestion {
  _id?: string;
  code: string;
  questionText: string;
  options: IQuestionOption[];
  isFirst: boolean;
}

export interface IQuestionOptionForm {
  label: string;
  value: string;
  specification: string; 
  nextQuestion?: string | null;
}

export interface IQuestionForm {
  code: string;
  questionText: string;
  isFirst: string;
  options: IQuestionOptionForm[];
}
