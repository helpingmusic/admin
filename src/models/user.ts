import {Doc} from "./doc";
import {Subscription} from "./subscription";
import {Coupon} from "./coupon";

export class User extends Doc {
  firstName: string;
  lastName: string;
  name: string;
  Subscriptions: Array<Subscription>;
  OriginCoupon: Coupon;

  role: string;
  email: string;
  stripeCustomerId: string;
}
