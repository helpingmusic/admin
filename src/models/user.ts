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


  get hasMultipleOfSameFilter() {
    return this.Subscriptions.some(s => {
      const filterSet = Array.from(new Set(s.filterSizes));
      return filterSet.length !== s.filterSizes.length;
    });
  }
  get hasHighFilterGrade() {
    return this.Subscriptions.some(s => s.filterGrade === 'c');
  }
  get hasUnchangedFrequency() {
    return this.Subscriptions.some(s => s.frequency === 2);
  }
  get hasEasyPromo() {
    return this.OriginCoupon && this.OriginCoupon.code === 'google';
  }

  get flagged() {
    const flagThreshold = 20;
    let flagPoints = 0;
    if (this.hasHighFilterGrade) flagPoints += 5;
    if (this.hasUnchangedFrequency) flagPoints += 5;
    if (this.hasMultipleOfSameFilter) flagPoints += 15;
    if (this.hasEasyPromo) flagPoints += 10;

    return flagPoints >= flagThreshold;
  }

  constructor(body: any) {
    super();
    Object.assign(this, body);
  }

}
