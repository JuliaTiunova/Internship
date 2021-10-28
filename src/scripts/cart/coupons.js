import { getElement, getStorageItem } from "../assets";
import * as $ from "jquery";
import { removeCoupon } from "./removeCoupon";

export const coupons = [
  "musicwave2021",
  "wahwah10",
  "stringsattached20",
  "stringsattached25",
  "guitarfingers30",
  "superduperdiscount",
];

export function displayCoupon() {
  let coupon = getStorageItem("coupon");
  const couponWrapper = getElement(".coupon__name");
  const message = getElement(".coupon__message");
  if (coupon.length == 0) {
    let index = Math.floor(Math.random() * 10).toFixed();
    while (index > coupons.length - 1) {
      index = Math.floor(Math.random() * 10).toFixed();
    }
    couponWrapper.innerHTML = coupons[index];
    $(message).hide();
  } else {
    couponWrapper.innerHTML = coupon;
    $(message).show(300);
    removeCoupon();
  }
}
