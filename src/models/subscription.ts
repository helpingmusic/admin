import {Doc} from "./doc";
import { Address } from "./address";

export class Subscription extends Doc {
  frequency: number;
  nextShipDate: string;
  filterSizes: Array<String>;
  filterGrade: String;
  Address: Address;
}
