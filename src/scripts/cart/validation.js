import { getElement, setStorageItem } from "../assets";
import { coupons } from "./coupons";
import { displayDiscount } from "./displayDiscount";
import * as $ from "jquery";
import { removeCoupon } from "./removeCoupon";

export const validateCoupon = (coupon, input) => {
  const removeButton = getElement(".coupon__message");
  let valid = coupons.find((item) => item.toUpperCase() === coupon);

  if (valid) {
    input.value = "";
    displayDiscount(coupon);
    setStorageItem("coupon", coupon);
    $(removeButton).show(300);
    removeCoupon();
  } else {
    input.value = `Fail. Try again`;
  }
};
