import { getElement, getStorageItem, setStorageItem } from "../assets";
import { coupons } from "./coupons";
import * as $ from "jquery";
import { removeCoupon } from "./removeCoupon";
import { getTotals } from "./getTotals";
import { displayTotals } from "./displayTotal";

export const validateCoupon = (coupon, input) => {
  const removeButton = getElement(".coupon__message");
  const cart = getStorageItem("cart");
  let valid = coupons.find((item) => item.toUpperCase() === coupon);

  if (valid) {
    input.value = "";
    setStorageItem("coupon", coupon);
    $(removeButton).show(300);
    removeCoupon();
    let totals = getTotals(cart);
    displayTotals(totals);
  } else {
    input.value = `Fail. Try again`;
  }
};
