import { getElement, setStorageItem } from "../assets";
import { coupons } from "./coupons";
import { displayDiscount } from "./displayDiscount";
import * as $ from "jquery";
import { removeCoupon } from "./removeCoupon";

export const validateCoupon = (coupon, input) => {
  const message = getElement(".coupon__message");
  let valid = coupons.find((item) => item.toUpperCase() === coupon);

  if (valid) {
    input.value = "";
    displayDiscount(coupon);
    setStorageItem("coupon", coupon);
    $(message).show(300);
    removeCoupon();
  } else {
    input.value = `Fail. Try again`;
  }
};
