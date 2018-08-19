import {Doc} from "./doc";

export class CreditTransaction extends Doc {
  user: string;
  startAmount: number;
  endAmount: number;
  type: string;
  meta: Object;
}


export class AllowanceTransaction extends Doc {
  user: string;
  amount: number;
  runOn: string;
  status: string;
}
