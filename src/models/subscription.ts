import {Doc} from "./doc";
import { Address } from "./address";
import { Order } from "./order";

export class Subscription extends Doc {
  frequency: number;
  nextShipDate: string;
  status: string;
  isActive: boolean;
  chargeAmount: number;
  filterSizes: Array<String>;
  filterGrade: String;
  Address: Address;
  Orders: Array<Order>;
}
