import {Doc} from "./doc";

export class CreditTransaction extends Doc {
  user: string;
  startAmount: number;
  endAmount: number;
  type: string;
  meta: Object;
}
