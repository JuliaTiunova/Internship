import { getElement } from "../assets";
import { validateCoupon } from "./validation";

export const updateListener = () => {
  const update = getElement(".bottom__button_update");
  update.onclick = () => {
    const input = getElement(".coupon__input");
    const coupon = input.value;
    console.log(`%c${coupon}`, "color:red");
    validateCoupon(coupon, input);
  };
};
