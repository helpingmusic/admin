import {Doc} from "./doc";

export class Address extends Doc {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipCode: string;
}
