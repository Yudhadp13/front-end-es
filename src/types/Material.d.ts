import { DateValue } from "@nextui-org/react";

interface ISpecification {
  _id?: string;
  name?: string;
}

interface IPlatform {
  _id?: string;
  name?: string;
  url?: string;
  material?: string;
}

interface IMaterial {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  description?: string;
  isPublish?: boolean | string;
  isSuperior?: boolean | string;
  characteristics?: string[];
  banner?: string | FileList;
}

interface IMaterialForm extends IMaterial {
  specification?: string[];
  platform?: string[];
}

export type { ISpecification, IPlatform, IMaterial, IMaterialForm };
