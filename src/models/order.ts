import {Doc} from "./doc";

export class Order extends Doc {
  shipstation: {
    orderId: string;
    orderKey: string;
  };
  chargeId: string;
  isPaid: boolean;
  chargeAmount: number;
  shippedOn: number;
}
