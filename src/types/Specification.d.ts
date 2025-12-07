interface ISpecification {
  _id?: string;
  name?: string;
  description?: string;
}

interface ISpecificationForm extends ISpecification {}

export type { ISpecification, ISpecificationForm };
