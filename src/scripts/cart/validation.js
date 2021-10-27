import { getStorageItem } from "../assets";
import { displayDiscount } from "./displayDiscount";

export const validateCoupon = (coupon, input) => {
  const storageCoupon = getStorageItem("coupon");
  if (coupon == storageCoupon.toUpperCase()) {
    input.value = `Congrats!`;
    displayDiscount(coupon);
  } else {
    input.value = `Fail. Try again`;
  }
};
