import { getElement, getStorageItem, setStorageItem } from "../assets";
import { displayCoupon } from "./coupons";
import * as $ from "jquery";

export const removeCoupon = () => {
  const buttonRemove = getElement(".coupon__message");
  let coupon = getStorageItem("coupon");

  buttonRemove.onclick = () => {
    coupon = [];
    setStorageItem("coupon", coupon);
    displayCoupon();
    $(buttonRemove).hide(300);
  };
};
