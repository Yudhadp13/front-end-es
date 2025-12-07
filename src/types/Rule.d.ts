interface IRule {
  _id?: string;
  name?: string;
  conditions?: string[]; 
  result?: string; 
}

interface IRuleForm {
  name: string;
  conditions: string[];
  result: string; 
}

interface IRuleFormUpdate extends IRule {
  name: string;
  specification?: string[];
  result: string; 
}

export type { IRule, IRuleForm, IRuleFormUpdate };
