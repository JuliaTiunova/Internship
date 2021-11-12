import { getElement } from "../assets";
import { displayCoupon } from "./coupons";

// clean input and display new coupon when press reload button
export const updateCoupon = () => {
  const reload = getElement(".coupon__button");
  reload.onclick = () => {
    const input = getElement(".coupon__input");
    if (input.value) {
      input.value = "";
    }
    displayCoupon();
  };
};
